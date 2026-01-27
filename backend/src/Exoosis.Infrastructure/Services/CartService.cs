using Microsoft.EntityFrameworkCore;
using Exoosis.Application.DTOs;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;

namespace Exoosis.Infrastructure.Services;

public class CartService : ICartService
{
    private readonly ExoosisDbContext _context;

    public CartService(ExoosisDbContext context)
    {
        _context = context;
    }

    public async Task<CartDto> GetCartAsync(string userId, CancellationToken cancellationToken = default)
    {
        var cart = await GetOrCreateCartAsync(userId, cancellationToken);
        return MapToDto(cart);
    }

    public async Task<CartDto> AddToCartAsync(string userId, AddToCartDto addToCartDto, CancellationToken cancellationToken = default)
    {
        var cart = await GetOrCreateCartAsync(userId, cancellationToken);
        var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == addToCartDto.ProductId);

        if (existingItem != null)
        {
            existingItem.Quantity += addToCartDto.Quantity;
        }
        else
        {
            var product = await _context.Products.FindAsync(new object[] { addToCartDto.ProductId }, cancellationToken);
            if (product != null) 
            {
                 cart.Items.Add(new CartItem
                 {
                     ProductId = addToCartDto.ProductId,
                     Quantity = addToCartDto.Quantity,
                     CartId = cart.Id
                 });
            }
        }

        await _context.SaveChangesAsync(cancellationToken);
        
        // Reload to include product details if added new
        return await GetCartAsync(userId, cancellationToken); 
    }

    public async Task<CartDto> UpdateQuantityAsync(string userId, Guid cartItemId, int quantity, CancellationToken cancellationToken = default)
    {
        var cart = await GetOrCreateCartAsync(userId, cancellationToken);
        var item = cart.Items.FirstOrDefault(i => i.Id == cartItemId);
        
        // Handling potential mismatch if frontend sends ProductId instead of ItemId
        if (item == null)
             item = cart.Items.FirstOrDefault(i => i.ProductId == cartItemId || i.Id == cartItemId);
        
        if (item != null)
        {
            if (quantity <= 0)
            {
                _context.CartItems.Remove(item);
            }
            else
            {
                item.Quantity = quantity;
            }
            await _context.SaveChangesAsync(cancellationToken);
        }

        return await GetCartAsync(userId, cancellationToken);
    }

    public async Task<CartDto> RemoveItemAsync(string userId, Guid cartItemId, CancellationToken cancellationToken = default)
    {
        var cart = await GetOrCreateCartAsync(userId, cancellationToken);
         var item = cart.Items.FirstOrDefault(i => i.Id == cartItemId);

        if (item != null)
        {
            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return await GetCartAsync(userId, cancellationToken);
    }

    public async Task ClearCartAsync(string userId, CancellationToken cancellationToken = default)
    {
        var cart = await GetOrCreateCartAsync(userId, cancellationToken);
        if (cart.Items.Any())
        {
            _context.CartItems.RemoveRange(cart.Items);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task<Cart> GetOrCreateCartAsync(string userId, CancellationToken cancellationToken)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId, cancellationToken);

        if (cart == null)
        {
            cart = new Cart { UserId = userId };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return cart;
    }

    // Changed to return CartDto instead of List<CartItemDto> to match Interface
    private CartDto MapToDto(Cart cart)
    {
        return new CartDto
        {
            Id = cart.Id,
            UserId = cart.UserId,
            Items = cart.Items.Select(i => new CartItemDto
            {
                Id = i.Id,
                ProductId = i.ProductId,
                ProductName = i.Product?.Name ?? "Unknown Product",
                ProductImage = i.Product?.ImageUrls?.Split(',').FirstOrDefault() ?? "",
                Price = i.Product?.Price ?? 0,
                Quantity = i.Quantity
            }).ToList()
        };
    }
}
