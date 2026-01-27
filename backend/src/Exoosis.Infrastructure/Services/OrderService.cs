using Microsoft.EntityFrameworkCore;
using Exoosis.Application.DTOs;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;

namespace Exoosis.Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly ExoosisDbContext _context;

    public OrderService(ExoosisDbContext context)
    {
        _context = context;
    }

    public async Task<OrderDto> CreateAsync(CreateOrderDto orderDto, string userId, CancellationToken cancellationToken = default)
    {
        var order = new Order
        {
            UserId = userId,
            CustomerName = orderDto.CustomerName,
            CustomerPhone = orderDto.CustomerPhone,
            CustomerAddress = orderDto.CustomerAddress,
            Status = "Processing",
            OrderDate = DateTime.UtcNow,
            TotalAmount = orderDto.Items.Sum(i => i.Price * i.Quantity),
            OrderItems = orderDto.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync(cancellationToken);

        return await MapToDto(order);
    }

    public async Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);

        if (order == null) return null;

        return await MapToDto(order);
    }

    public async Task<IReadOnlyList<OrderDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync(cancellationToken);

        return await Task.WhenAll(orders.Select(MapToDto));
    }

    public async Task<OrderDto?> UpdateStatusAsync(Guid id, string status, CancellationToken cancellationToken = default)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);

        if (order == null) return null;

        order.Status = status;
        await _context.SaveChangesAsync(cancellationToken);

        return await MapToDto(order);
    }

    private async Task<OrderDto> MapToDto(Order order)
    {
        // Manual mapping for now, ideally use AutoMapper if configured
        return new OrderDto
        {
            Id = order.Id,
            CustomerName = order.CustomerName,
            CustomerPhone = order.CustomerPhone,
            CustomerAddress = order.CustomerAddress,
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            OrderDate = order.OrderDate,
            Items = order.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = oi.Product?.Name ?? "Unknown Product", 
                Quantity = oi.Quantity,
                Price = oi.Price
            }).ToList()
        };
    }
}
