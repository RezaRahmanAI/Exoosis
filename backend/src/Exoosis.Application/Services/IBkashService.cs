using Exoosis.Application.DTOs.Payments;

namespace Exoosis.Application.Services;

public interface IBkashService
{
    Task<string> GetTokenAsync();
    Task<BkashCreatePaymentResponse?> CreatePaymentAsync(decimal amount, string invoiceNumber);
    Task<BkashExecutePaymentResponse?> ExecutePaymentAsync(string paymentId);
}
