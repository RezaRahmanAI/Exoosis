using Exoosis.Application.DTOs.Products;

namespace Exoosis.Application.Services;

public interface IProductService
{
    Task<IReadOnlyList<ProductDto>> GetAllAsync(ProductQueryParameters parameters, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<ProductDto>> GetByCategoryAsync(Guid categoryId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<ProductDto>> GetByBrandAsync(Guid brandId, CancellationToken cancellationToken = default);
    Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<ProductDto>> GetLowStockAsync(int threshold, CancellationToken cancellationToken = default);
    Task<ProductDto> CreateAsync(CreateProductRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<ProductDto?> UpdateAsync(Guid id, UpdateProductRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default);
}
