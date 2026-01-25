using AutoMapper;
using Exoosis.Application.DTOs.Brands;
using Exoosis.Application.Interfaces;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;

namespace Exoosis.Infrastructure.Services;

public class BrandService : IBrandService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public BrandService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<BrandDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var brands = await _unitOfWork.Brands.ListAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IReadOnlyList<BrandDto>>(brands);
    }

    public async Task<BrandDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var brand = await _unitOfWork.Brands.GetByIdAsync(id, cancellationToken);
        return brand == null ? null : _mapper.Map<BrandDto>(brand);
    }

    public async Task<BrandDto> CreateAsync(CreateBrandRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var brand = _mapper.Map<Brand>(request);
        brand.CreatedBy = userId;
        await _unitOfWork.Brands.AddAsync(brand, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<BrandDto>(brand);
    }

    public async Task<BrandDto?> UpdateAsync(Guid id, UpdateBrandRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var brand = await _unitOfWork.Brands.GetByIdAsync(id, cancellationToken);
        if (brand == null)
        {
            return null;
        }

        _mapper.Map(request, brand);
        brand.UpdatedAt = DateTime.UtcNow;
        brand.UpdatedBy = userId;
        _unitOfWork.Brands.Update(brand);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<BrandDto>(brand);
    }

    public async Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default)
    {
        var brand = await _unitOfWork.Brands.GetByIdAsync(id, cancellationToken);
        if (brand == null)
        {
            return false;
        }

        brand.IsDeleted = true;
        brand.IsActive = false;
        brand.UpdatedAt = DateTime.UtcNow;
        brand.UpdatedBy = userId;
        _unitOfWork.Brands.Update(brand);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
