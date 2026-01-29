using AutoMapper;
using Exoosis.Application.DTOs.PageHero;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Infrastructure.Services;

public class PageHeroContentService : IPageHeroContentService
{
    private readonly ExoosisDbContext _context;
    private readonly IMapper _mapper;

    public PageHeroContentService(ExoosisDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PageHeroContentDto>> GetAllAsync()
    {
        var items = await _context.PageHeroContents
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
        return _mapper.Map<IEnumerable<PageHeroContentDto>>(items);
    }

    public async Task<PageHeroContentDto?> GetByIdAsync(Guid id)
    {
        var item = await _context.PageHeroContents.FindAsync(id);
        if (item == null || item.IsDeleted) return null;
        return _mapper.Map<PageHeroContentDto>(item);
    }

    public async Task<PageHeroContentDto?> GetActiveByPageKeyAsync(string pageKey)
    {
        var item = await _context.PageHeroContents
            .Where(x => x.PageKey == pageKey && x.IsActive && !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync();
        return _mapper.Map<PageHeroContentDto>(item);
    }

    public async Task<PageHeroContentDto> CreateAsync(CreatePageHeroContentRequest request)
    {
        var item = _mapper.Map<PageHeroContent>(request);
        _context.PageHeroContents.Add(item);
        await _context.SaveChangesAsync();
        return _mapper.Map<PageHeroContentDto>(item);
    }

    public async Task<PageHeroContentDto> UpdateAsync(Guid id, UpdatePageHeroContentRequest request)
    {
        var item = await _context.PageHeroContents.FindAsync(id);
        if (item == null || item.IsDeleted) throw new KeyNotFoundException("Page hero content not found");

        _mapper.Map(request, item);
        item.UpdatedAt = DateTime.UtcNow;
        _context.PageHeroContents.Update(item);
        await _context.SaveChangesAsync();
        return _mapper.Map<PageHeroContentDto>(item);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await _context.PageHeroContents.FindAsync(id);
        if (item == null || item.IsDeleted) return false;

        item.IsDeleted = true;
        item.UpdatedAt = DateTime.UtcNow;
        _context.PageHeroContents.Update(item);
        await _context.SaveChangesAsync();
        return true;
    }
}
