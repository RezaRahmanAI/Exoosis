using AutoMapper;
using Exoosis.Application.DTOs.About;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Infrastructure.Services;

public class AboutMissionContentService : IAboutMissionContentService
{
    private readonly ExoosisDbContext _context;
    private readonly IMapper _mapper;

    public AboutMissionContentService(ExoosisDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AboutMissionContentDto>> GetAllAsync()
    {
        var items = await _context.AboutMissionContents
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
        return _mapper.Map<IEnumerable<AboutMissionContentDto>>(items);
    }

    public async Task<AboutMissionContentDto?> GetByIdAsync(Guid id)
    {
        var item = await _context.AboutMissionContents.FindAsync(id);
        if (item == null || item.IsDeleted) return null;
        return _mapper.Map<AboutMissionContentDto>(item);
    }

    public async Task<AboutMissionContentDto?> GetActiveAsync()
    {
        var item = await _context.AboutMissionContents
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync();
        return _mapper.Map<AboutMissionContentDto>(item);
    }

    public async Task<AboutMissionContentDto> CreateAsync(CreateAboutMissionContentRequest request)
    {
        var item = _mapper.Map<AboutMissionContent>(request);
        _context.AboutMissionContents.Add(item);
        await _context.SaveChangesAsync();
        return _mapper.Map<AboutMissionContentDto>(item);
    }

    public async Task<AboutMissionContentDto> UpdateAsync(Guid id, UpdateAboutMissionContentRequest request)
    {
        var item = await _context.AboutMissionContents.FindAsync(id);
        if (item == null || item.IsDeleted) throw new KeyNotFoundException("About mission content not found");

        _mapper.Map(request, item);
        item.UpdatedAt = DateTime.UtcNow;
        _context.AboutMissionContents.Update(item);
        await _context.SaveChangesAsync();
        return _mapper.Map<AboutMissionContentDto>(item);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await _context.AboutMissionContents.FindAsync(id);
        if (item == null || item.IsDeleted) return false;

        item.IsDeleted = true;
        item.UpdatedAt = DateTime.UtcNow;
        _context.AboutMissionContents.Update(item);
        await _context.SaveChangesAsync();
        return true;
    }
}
