using Exoosis.Application.DTOs;
using Exoosis.Application.Services;
using Exoosis.Application.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/cart")]
//[Authorize]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    private string GetUserId()
    {
        if (User?.Identity?.IsAuthenticated == true && !string.IsNullOrEmpty(User.Identity.Name))
        {
             return User.Identity.Name;
        }
        
        if (Request.Headers.TryGetValue("X-Guest-Id", out var guestId))
        {
            return guestId.ToString();
        }

        // Fallback that will likely cause collisions if frontend fails to send header
        return "guest_user"; 
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<CartItemDto>>>> GetCart(CancellationToken cancellationToken)
    {
        var cart = await _cartService.GetCartAsync(GetUserId(), cancellationToken);
        // Returning Items list directly wrapped in ApiResponse to match frontend expectation of array
        return Ok(ApiResponse<List<CartItemDto>>.Ok(cart.Items)); 
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<List<CartItemDto>>>> AddToCart([FromBody] AddToCartDto request, CancellationToken cancellationToken)
    {
        var cart = await _cartService.AddToCartAsync(GetUserId(), request, cancellationToken);
        return Ok(ApiResponse<List<CartItemDto>>.Ok(cart.Items, "Item added to cart"));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<List<CartItemDto>>>> UpdateQuantity(Guid id, [FromBody] AddToCartDto request, CancellationToken cancellationToken)
    {
        // Frontend sends quantity in body
        var cart = await _cartService.UpdateQuantityAsync(GetUserId(), id, request.Quantity, cancellationToken);
        return Ok(ApiResponse<List<CartItemDto>>.Ok(cart.Items, "Cart updated"));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<List<CartItemDto>>>> RemoveItem(Guid id, CancellationToken cancellationToken)
    {
        var cart = await _cartService.RemoveItemAsync(GetUserId(), id, cancellationToken);
        return Ok(ApiResponse<List<CartItemDto>>.Ok(cart.Items, "Item removed"));
    }
    
    [HttpDelete]
    public async Task<ActionResult<ApiResponse<List<CartItemDto>>>> ClearCart(CancellationToken cancellationToken)
    {
         await _cartService.ClearCartAsync(GetUserId(), cancellationToken);
         return Ok(ApiResponse<List<CartItemDto>>.Ok(new List<CartItemDto>(), "Cart cleared"));
    }
}
