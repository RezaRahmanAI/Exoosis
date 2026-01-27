using Exoosis.Application.DTOs;
using Exoosis.Application.Services;
using Exoosis.Application.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    [Authorize] // Any logged in user
    public async Task<ActionResult<ApiResponse<OrderDto>>> Create([FromBody] CreateOrderDto request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        if (string.IsNullOrEmpty(userId))
        {
             // Fallback for demo if claims not set correctly, but [Authorize] should catch 401. 
             // Ideally claim name is "uid" or similar, but ProductController used Name.
             return Unauthorized(ApiResponse<string>.Fail("User ID not found in token."));
        }

        var order = await _orderService.CreateAsync(request, userId, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = order.Id }, ApiResponse<OrderDto>.Ok(order, "Order placed successfully"));
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<OrderDto>>>> GetAll(CancellationToken cancellationToken)
    {
        var orders = await _orderService.GetAllAsync(cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<OrderDto>>.Ok(orders));
    }

    [HttpGet("{id:guid}")]
    [Authorize] // Admin or Owner (logic simplified here to just Authorize, ideally Resource-Based Auth)
    public async Task<ActionResult<ApiResponse<OrderDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var order = await _orderService.GetByIdAsync(id, cancellationToken);
        if (order == null)
        {
            return NotFound(ApiResponse<OrderDto>.Fail("Order not found."));
        }
        return Ok(ApiResponse<OrderDto>.Ok(order));
    }

    [HttpPut("{id:guid}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<OrderDto>>> UpdateStatus(Guid id, [FromBody] string status, CancellationToken cancellationToken)
    {
        var order = await _orderService.UpdateStatusAsync(id, status, cancellationToken);
        if (order == null)
        {
            return NotFound(ApiResponse<OrderDto>.Fail("Order not found."));
        }
        return Ok(ApiResponse<OrderDto>.Ok(order, "Order status updated successfully"));
    }
}
