using Exoosis.Application.DTOs.Cart;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Infrastructure.Services;

public class CartService : ICartService
{
    private readonly ExoosisDbContext _context;

    public CartService(ExoosisDbContext context)
    {
        _context = context;
    }

    public async Task<CartDto> GetCartAsync(string userId)
    {
        var cart = await GetCartByUserId(userId);

        if (cart == null)
        {
            return new CartDto
            {
                UserId = userId,
                Items = new List<CartItemDto>(),
                GrandTotal = 0
            };
        }

        return MapToDto(cart);
    }

    public async Task AddToCartAsync(AddToCartDto addToCartDto)
    {
        var cart = await GetCartByUserId(addToCartDto.UserId);
        if (cart == null)
        {
            cart = new Cart
            {
                UserId = addToCartDto.UserId,
                Items = new List<CartItem>()
            };
            _context.Carts.Add(cart);
        }

        var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == addToCartDto.ProductId);
        if (existingItem != null)
        {
            existingItem.Quantity += addToCartDto.Quantity;
        }
        else
        {
            var product = await _context.Products.FindAsync(addToCartDto.ProductId);
            if (product == null)
            {
                throw new Exception("Product not found"); // Should use a custom NotFoundException
            }

            // Check stock? Assuming sufficient stock for now as per minimal requirements,
            // but ideally: if (product.StockQuantity < addToCartDto.Quantity) ...

            cart.Items.Add(new CartItem
            {
                ProductId = addToCartDto.ProductId,
                Quantity = addToCartDto.Quantity
            });
        }

        await _context.SaveChangesAsync();
    }

    public async Task UpdateCartItemAsync(UpdateCartItemDto updateCartItemDto)
    {
        var cart = await GetCartByUserId(updateCartItemDto.UserId);
        if (cart == null) return;

        var item = cart.Items.FirstOrDefault(i => i.Id == updateCartItemDto.CartItemId);
        if (item != null)
        {
            if (updateCartItemDto.Quantity <= 0)
            {
                cart.Items.Remove(item);
            }
            else
            {
                item.Quantity = updateCartItemDto.Quantity;
            }
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveFromCartAsync(string userId, Guid cartItemId)
    {
        var cart = await GetCartByUserId(userId);
        if (cart == null) return;

        var item = cart.Items.FirstOrDefault(i => i.Id == cartItemId);
        if (item != null)
        {
            cart.Items.Remove(item);
            await _context.SaveChangesAsync();
        }
    }

    public async Task ClearCartAsync(string userId)
    {
         var cart = await GetCartByUserId(userId);
         if (cart != null)
         {
             _context.Carts.Remove(cart);
             await _context.SaveChangesAsync();
         }
    }

    private async Task<Cart?> GetCartByUserId(string userId)
    {
        return await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);
    }

    private CartDto MapToDto(Cart cart)
    {
        return new CartDto
        {
            Id = cart.Id,
            UserId = cart.UserId,
            // Re-calculate grand total here to ensure it's up to date with product prices
            GrandTotal = cart.Items.Sum(i => i.Quantity * (i.Product?.Price ?? 0)),
            Items = cart.Items.Select(i => new CartItemDto
            {
                Id = i.Id,
                ProductId = i.ProductId,
                ProductName = i.Product?.Name ?? "Unknown Product",
                ProductImageUrl = i.Product?.ImageUrls?.Split(',').FirstOrDefault() ?? "",
                Price = i.Product?.Price ?? 0,
                Quantity = i.Quantity
            }).ToList()
        };
    }
}
