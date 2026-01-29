using Exoosis.Application.DTOs.About;

namespace Exoosis.Application.Services;

public interface IAboutMissionContentService
{
    Task<IEnumerable<AboutMissionContentDto>> GetAllAsync();
    Task<AboutMissionContentDto?> GetByIdAsync(Guid id);
    Task<AboutMissionContentDto?> GetActiveAsync();
    Task<AboutMissionContentDto> CreateAsync(CreateAboutMissionContentRequest request);
    Task<AboutMissionContentDto> UpdateAsync(Guid id, UpdateAboutMissionContentRequest request);
    Task<bool> DeleteAsync(Guid id);
}
