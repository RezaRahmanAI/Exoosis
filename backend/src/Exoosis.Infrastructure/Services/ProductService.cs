using AutoMapper;
using AutoMapper.QueryableExtensions;
using Exoosis.Application.DTOs.Products;
using Exoosis.Application.Interfaces;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProductService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<ProductDto>> GetAllAsync(ProductQueryParameters parameters, CancellationToken cancellationToken = default)
    {
        var query = _unitOfWork.Products.Query()
            .Include(product => product.Category)
            .Include(product => product.Brand)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(parameters.Search))
        {
            query = query.Where(product => product.Name.Contains(parameters.Search));
        }

        if (parameters.CategoryId.HasValue)
        {
            query = query.Where(product => product.CategoryId == parameters.CategoryId.Value);
        }

        if (parameters.BrandId.HasValue)
        {
            query = query.Where(product => product.BrandId == parameters.BrandId.Value);
        }

        if (!string.IsNullOrWhiteSpace(parameters.SortBy))
        {
            query = parameters.SortBy.ToLowerInvariant() switch
            {
                "price" => parameters.SortDescending ? query.OrderByDescending(product => product.Price) : query.OrderBy(product => product.Price),
                "name" => parameters.SortDescending ? query.OrderByDescending(product => product.Name) : query.OrderBy(product => product.Name),
                _ => query.OrderBy(product => product.CreatedAt)
            };
        }
        else
        {
            query = query.OrderBy(product => product.CreatedAt);
        }

        var skip = (parameters.Page - 1) * parameters.PageSize;
        if (skip < 0)
        {
            skip = 0;
        }

        return await query
            .Skip(skip)
            .Take(parameters.PageSize)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ProductDto>> GetByCategoryAsync(Guid categoryId, CancellationToken cancellationToken = default)
    {
        var products = await _unitOfWork.Products.Query()
            .Where(product => product.CategoryId == categoryId)
            .Include(product => product.Category)
            .Include(product => product.Brand)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return products;
    }

    public async Task<IReadOnlyList<ProductDto>> GetByBrandAsync(Guid brandId, CancellationToken cancellationToken = default)
    {
        var products = await _unitOfWork.Products.Query()
            .Where(product => product.BrandId == brandId)
            .Include(product => product.Category)
            .Include(product => product.Brand)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return products;
    }

    public async Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _unitOfWork.Products.Query()
            .Include(item => item.Category)
            .Include(item => item.Brand)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

        return product == null ? null : _mapper.Map<ProductDto>(product);
    }

    public async Task<ProductDto> CreateAsync(CreateProductRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        await EnsureCatalogReferencesAsync(request.CategoryId, request.BrandId, cancellationToken);

        var product = _mapper.Map<Product>(request);
        product.CreatedBy = userId;
        await _unitOfWork.Products.AddAsync(product, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<ProductDto>(product);
    }

    public async Task<ProductDto?> UpdateAsync(Guid id, UpdateProductRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var product = await _unitOfWork.Products.GetByIdAsync(id, cancellationToken);
        if (product == null)
        {
            return null;
        }

        await EnsureCatalogReferencesAsync(request.CategoryId, request.BrandId, cancellationToken);
        _mapper.Map(request, product);
        product.UpdatedAt = DateTime.UtcNow;
        product.UpdatedBy = userId;
        _unitOfWork.Products.Update(product);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<ProductDto>(product);
    }

    public async Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default)
    {
        var product = await _unitOfWork.Products.GetByIdAsync(id, cancellationToken);
        if (product == null)
        {
            return false;
        }

        product.IsDeleted = true;
        product.IsActive = false;
        product.UpdatedAt = DateTime.UtcNow;
        product.UpdatedBy = userId;
        _unitOfWork.Products.Update(product);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }

    private async Task EnsureCatalogReferencesAsync(Guid categoryId, Guid brandId, CancellationToken cancellationToken)
    {
        var categoryExists = await _unitOfWork.Categories.GetByIdAsync(categoryId, cancellationToken) != null;
        var brandExists = await _unitOfWork.Brands.GetByIdAsync(brandId, cancellationToken) != null;

        if (!categoryExists || !brandExists)
        {
            throw new InvalidOperationException("Category or Brand not found.");
        }
    }
}
