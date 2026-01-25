using Exoosis.Application.DTOs.Brands;
using Exoosis.Application.Responses;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/brands")]
public class BrandsController : ControllerBase
{
    private readonly IBrandService _brandService;

    public BrandsController(IBrandService brandService)
    {
        _brandService = brandService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<BrandDto>>>> GetAll(CancellationToken cancellationToken)
    {
        var brands = await _brandService.GetAllAsync(cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<BrandDto>>.Ok(brands));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<BrandDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var brand = await _brandService.GetByIdAsync(id, cancellationToken);
        if (brand == null)
        {
            return NotFound(ApiResponse<BrandDto>.Fail("Brand not found."));
        }

        return Ok(ApiResponse<BrandDto>.Ok(brand));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<BrandDto>>> Create([FromBody] CreateBrandRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var brand = await _brandService.CreateAsync(request, userId, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = brand.Id }, ApiResponse<BrandDto>.Ok(brand, "Brand created successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<BrandDto>>> Update(Guid id, [FromBody] UpdateBrandRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var brand = await _brandService.UpdateAsync(id, request, userId, cancellationToken);
        if (brand == null)
        {
            return NotFound(ApiResponse<BrandDto>.Fail("Brand not found."));
        }

        return Ok(ApiResponse<BrandDto>.Ok(brand, "Brand updated successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var removed = await _brandService.DeleteAsync(id, userId, cancellationToken);
        if (!removed)
        {
            return NotFound(ApiResponse<string>.Fail("Brand not found."));
        }

        return Ok(ApiResponse<string>.Ok("Deleted", "Brand deleted successfully"));
    }
}
