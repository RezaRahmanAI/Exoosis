using Exoosis.Application.DTOs;
using Exoosis.Domain.Entities;

namespace Exoosis.Application.Services;

public interface IOrderService
{
    Task<OrderDto> CreateAsync(CreateOrderDto orderDto, string userId, CancellationToken cancellationToken = default);
    Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<OrderDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<OrderDto?> UpdateStatusAsync(Guid id, string status, CancellationToken cancellationToken = default);
}
