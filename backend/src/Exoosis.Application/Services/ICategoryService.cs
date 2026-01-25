using Exoosis.Application.DTOs.Categories;

namespace Exoosis.Application.Services;

public interface ICategoryService
{
    Task<IReadOnlyList<CategoryDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<CategoryDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<CategoryDto> CreateAsync(CreateCategoryRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<CategoryDto?> UpdateAsync(Guid id, UpdateCategoryRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default);
}
