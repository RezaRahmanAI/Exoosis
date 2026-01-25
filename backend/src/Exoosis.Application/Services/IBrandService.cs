using Exoosis.Application.DTOs.Brands;

namespace Exoosis.Application.Services;

public interface IBrandService
{
    Task<IReadOnlyList<BrandDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<BrandDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<BrandDto> CreateAsync(CreateBrandRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<BrandDto?> UpdateAsync(Guid id, UpdateBrandRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default);
}
