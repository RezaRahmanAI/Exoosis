using Exoosis.Application.DTOs.About;

namespace Exoosis.Application.Services;

public interface IAboutCoreValueService
{
    Task<IEnumerable<AboutCoreValueDto>> GetAllAsync();
    Task<IEnumerable<AboutCoreValueDto>> GetActiveAsync();
    Task<AboutCoreValueDto?> GetByIdAsync(Guid id);
    Task<AboutCoreValueDto> CreateAsync(CreateAboutCoreValueRequest request);
    Task<AboutCoreValueDto> UpdateAsync(Guid id, UpdateAboutCoreValueRequest request);
    Task<bool> DeleteAsync(Guid id);
}
