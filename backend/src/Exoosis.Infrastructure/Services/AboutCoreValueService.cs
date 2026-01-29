using AutoMapper;
using Exoosis.Application.DTOs.About;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Infrastructure.Services;

public class AboutCoreValueService : IAboutCoreValueService
{
    private readonly ExoosisDbContext _context;
    private readonly IMapper _mapper;

    public AboutCoreValueService(ExoosisDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AboutCoreValueDto>> GetAllAsync()
    {
        var items = await _context.AboutCoreValues
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
        return _mapper.Map<IEnumerable<AboutCoreValueDto>>(items);
    }

    public async Task<IEnumerable<AboutCoreValueDto>> GetActiveAsync()
    {
        var items = await _context.AboutCoreValues
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
        return _mapper.Map<IEnumerable<AboutCoreValueDto>>(items);
    }

    public async Task<AboutCoreValueDto?> GetByIdAsync(Guid id)
    {
        var item = await _context.AboutCoreValues.FindAsync(id);
        if (item == null || item.IsDeleted) return null;
        return _mapper.Map<AboutCoreValueDto>(item);
    }

    public async Task<AboutCoreValueDto> CreateAsync(CreateAboutCoreValueRequest request)
    {
        var item = _mapper.Map<AboutCoreValue>(request);
        _context.AboutCoreValues.Add(item);
        await _context.SaveChangesAsync();
        return _mapper.Map<AboutCoreValueDto>(item);
    }

    public async Task<AboutCoreValueDto> UpdateAsync(Guid id, UpdateAboutCoreValueRequest request)
    {
        var item = await _context.AboutCoreValues.FindAsync(id);
        if (item == null || item.IsDeleted) throw new KeyNotFoundException("About core value not found");

        _mapper.Map(request, item);
        item.UpdatedAt = DateTime.UtcNow;
        _context.AboutCoreValues.Update(item);
        await _context.SaveChangesAsync();
        return _mapper.Map<AboutCoreValueDto>(item);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await _context.AboutCoreValues.FindAsync(id);
        if (item == null || item.IsDeleted) return false;

        item.IsDeleted = true;
        item.UpdatedAt = DateTime.UtcNow;
        _context.AboutCoreValues.Update(item);
        await _context.SaveChangesAsync();
        return true;
    }
}
