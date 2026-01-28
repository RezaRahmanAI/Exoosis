using Exoosis.Application.DTOs.Jobs;

namespace Exoosis.Application.Services;

public interface IJobService
{
    Task<IReadOnlyList<JobDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<JobDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<JobDto> CreateAsync(CreateJobRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<JobDto?> UpdateAsync(Guid id, UpdateJobRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default);
}
