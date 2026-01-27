using Exoosis.Application.DTOs.Cart;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<CartDto>> GetCart(string userId)
    {
        try
        {
            var cart = await _cartService.GetCartAsync(userId);
            return Ok(cart);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartDto addToCartDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            await _cartService.AddToCartAsync(addToCartDto);
            return Ok(new { message = "Item added to cart successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("update-item")]
    public async Task<IActionResult> UpdateCartItem([FromBody] UpdateCartItemDto updateCartItemDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            await _cartService.UpdateCartItemAsync(updateCartItemDto);
            return Ok(new { message = "Cart item updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("remove/{userId}/{cartItemId}")]
    public async Task<IActionResult> RemoveFromCart(string userId, Guid cartItemId)
    {
        try
        {
            await _cartService.RemoveFromCartAsync(userId, cartItemId);
            return Ok(new { message = "Item removed from cart successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("clear/{userId}")]
    public async Task<IActionResult> ClearCart(string userId)
    {
        try
        {
            await _cartService.ClearCartAsync(userId);
            return Ok(new { message = "Cart cleared successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
