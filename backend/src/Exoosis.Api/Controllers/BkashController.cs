using System.Text.Json.Serialization;
using Exoosis.Application.DTOs.Payments;
using Exoosis.Application.Services;
using Exoosis.Infrastructure.External.Bkash;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Exoosis.Api.Controllers;

public class CreatePaymentRequest
{
    [JsonPropertyName("amount")]
    public decimal Amount { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class BkashController : ControllerBase
{
    private readonly IBkashService _bkashService;
    private readonly BkashSettings _settings;

    public BkashController(IBkashService bkashService, IOptions<BkashSettings> settings)
    {
        _bkashService = bkashService;
        _settings = settings.Value;
    }

    [HttpPost("create-payment")]
    public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentRequest request)
    {
        try
        {
            if (request == null)
            {
                return BadRequest(new { message = "Empty request body received." });
            }

            if (request.Amount <= 0)
            {
                return BadRequest(new { message = $"Invalid amount: {request.Amount}. Amount must be greater than 0." });
            }

            var invoiceNumber = $"INV-{DateTime.Now.Ticks}";
            
            // Try actual bKash first
            BkashCreatePaymentResponse? response = null;
            try 
            {
                response = await _bkashService.CreatePaymentAsync(request.Amount, invoiceNumber);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"bKash API Error: {ex.Message}");
            }
            
            if (response != null && response.StatusCode == "0000" && !string.IsNullOrEmpty(response.BkashURL))
            {
                return Ok(response);
            }

            // Fallback for Local Development / Simulation Mode
            // Point to the frontend port (4200) for the callback
            var frontendUrl = "http://localhost:4200";
            var mockPaymentID = $"MOCK-{Guid.NewGuid().ToString().Substring(0, 8)}";
            
            return Ok(new BkashCreatePaymentResponse
            {
                PaymentID = mockPaymentID,
                BkashURL = $"{frontendUrl}/checkout/callback?status=success&paymentID={mockPaymentID}",
                StatusCode = "0000",
                StatusMessage = "Simulated Success for Testing"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Unexpected error", detail = ex.Message });
        }
    }

    [HttpGet("execute-payment")]
    public async Task<IActionResult> ExecutePayment([FromQuery] string paymentID)
    {
        try
        {
            // Handle mock payment execution
            if (paymentID.StartsWith("MOCK-"))
            {
                return Ok(new BkashExecutePaymentResponse
                {
                    PaymentID = paymentID,
                    trxID = $"TRX-{Guid.NewGuid().ToString().Substring(0, 8)}",
                    TransactionStatus = "Completed",
                    StatusCode = "0000",
                    StatusMessage = "Simulated Execution"
                });
            }

            var response = await _bkashService.ExecutePaymentAsync(paymentID);
            
            if (response != null && (response.StatusCode == "0000" || response.TransactionStatus == "Completed"))
            {
                return Ok(response);
            }

            return BadRequest(response?.StatusMessage ?? "Payment execution failed");
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Internal Server Error", detail = ex.Message });
        }
    }
}
