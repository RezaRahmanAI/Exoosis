using AutoMapper;
using Exoosis.Application.DTOs.Hero;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Infrastructure.Services;

public class HeroContentService : IHeroContentService
{
    private readonly ExoosisDbContext _context;
    private readonly IMapper _mapper;

    public HeroContentService(ExoosisDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<HeroContentDto>> GetAllAsync()
    {
        var items = await _context.HeroContents
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
        return _mapper.Map<IEnumerable<HeroContentDto>>(items);
    }

    public async Task<HeroContentDto?> GetByIdAsync(Guid id)
    {
        var item = await _context.HeroContents.FindAsync(id);
        if (item == null || item.IsDeleted) return null;
        return _mapper.Map<HeroContentDto>(item);
    }

    public async Task<HeroContentDto?> GetActiveHeroAsync()
    {
        var item = await _context.HeroContents
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync();
        return _mapper.Map<HeroContentDto>(item);
    }

    public async Task<HeroContentDto> CreateAsync(CreateHeroContentRequest request)
    {
        var item = _mapper.Map<HeroContent>(request);
        _context.HeroContents.Add(item);
        await _context.SaveChangesAsync();
        return _mapper.Map<HeroContentDto>(item);
    }

    public async Task<HeroContentDto> UpdateAsync(Guid id, UpdateHeroContentRequest request)
    {
        var item = await _context.HeroContents.FindAsync(id);
        if (item == null || item.IsDeleted) throw new KeyNotFoundException("Hero content not found");

        _mapper.Map(request, item);
        item.UpdatedAt = DateTime.UtcNow;
        _context.HeroContents.Update(item);
        await _context.SaveChangesAsync();
        return _mapper.Map<HeroContentDto>(item);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await _context.HeroContents.FindAsync(id);
        if (item == null || item.IsDeleted) return false;

        item.IsDeleted = true;
        item.UpdatedAt = DateTime.UtcNow;
        _context.HeroContents.Update(item);
        await _context.SaveChangesAsync();
        return true;
    }
}
