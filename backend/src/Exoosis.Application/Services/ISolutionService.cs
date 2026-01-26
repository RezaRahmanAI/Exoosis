using Exoosis.Application.DTOs.Solutions;

namespace Exoosis.Application.Services;

public interface ISolutionService
{
    Task<IReadOnlyList<SolutionDto>> GetAllAsync(string? industry, CancellationToken cancellationToken = default);
    Task<SolutionDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<SolutionDto> CreateAsync(CreateSolutionRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<SolutionDto?> UpdateAsync(Guid id, UpdateSolutionRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default);
}
