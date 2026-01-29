using Exoosis.Application.DTOs.PageHero;

namespace Exoosis.Application.Services;

public interface IPageHeroContentService
{
    Task<IEnumerable<PageHeroContentDto>> GetAllAsync();
    Task<PageHeroContentDto?> GetByIdAsync(Guid id);
    Task<PageHeroContentDto?> GetActiveByPageKeyAsync(string pageKey);
    Task<PageHeroContentDto> CreateAsync(CreatePageHeroContentRequest request);
    Task<PageHeroContentDto> UpdateAsync(Guid id, UpdatePageHeroContentRequest request);
    Task<bool> DeleteAsync(Guid id);
}
