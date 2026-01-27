using Exoosis.Application.DTOs;

namespace Exoosis.Application.Services;

public interface ICartService
{
    Task<CartDto> GetCartAsync(string userId, CancellationToken cancellationToken = default);
    Task<CartDto> AddToCartAsync(string userId, AddToCartDto addToCartDto, CancellationToken cancellationToken = default);
    Task<CartDto> UpdateQuantityAsync(string userId, Guid cartItemId, int quantity, CancellationToken cancellationToken = default);
    Task<CartDto> RemoveItemAsync(string userId, Guid cartItemId, CancellationToken cancellationToken = default);
    Task ClearCartAsync(string userId, CancellationToken cancellationToken = default);
}
