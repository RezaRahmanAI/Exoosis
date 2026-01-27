using System.Threading.Tasks;
using Exoosis.Application.DTOs.Cart;

namespace Exoosis.Application.Services;

public interface ICartService
{
    Task<CartDto> GetCartAsync(string userId);
    Task AddToCartAsync(AddToCartDto addToCartDto);
    Task UpdateCartItemAsync(UpdateCartItemDto updateCartItemDto);
    Task RemoveFromCartAsync(string userId, Guid cartItemId);
    Task ClearCartAsync(string userId);
}
