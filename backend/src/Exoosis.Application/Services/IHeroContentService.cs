using Exoosis.Application.DTOs.Hero;

namespace Exoosis.Application.Services;

public interface IHeroContentService
{
    Task<IEnumerable<HeroContentDto>> GetAllAsync();
    Task<HeroContentDto?> GetByIdAsync(Guid id);
    Task<HeroContentDto?> GetActiveHeroAsync();
    Task<HeroContentDto> CreateAsync(CreateHeroContentRequest request);
    Task<HeroContentDto> UpdateAsync(Guid id, UpdateHeroContentRequest request);
    Task<bool> DeleteAsync(Guid id);
}
