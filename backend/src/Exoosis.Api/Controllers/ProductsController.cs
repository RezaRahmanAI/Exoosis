using Exoosis.Application.DTOs.Products;
using Exoosis.Application.Responses;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProductDto>>>> GetAll([FromQuery] ProductQueryParameters parameters, CancellationToken cancellationToken)
    {
        var products = await _productService.GetAllAsync(parameters, cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<ProductDto>>.Ok(products));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ProductDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var product = await _productService.GetByIdAsync(id, cancellationToken);
        if (product == null)
        {
            return NotFound(ApiResponse<ProductDto>.Fail("Product not found."));
        }

        return Ok(ApiResponse<ProductDto>.Ok(product));
    }

    [HttpGet("by-category/{categoryId:guid}")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProductDto>>>> GetByCategory(Guid categoryId, CancellationToken cancellationToken)
    {
        var products = await _productService.GetByCategoryAsync(categoryId, cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<ProductDto>>.Ok(products));
    }

    [HttpGet("by-brand/{brandId:guid}")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProductDto>>>> GetByBrand(Guid brandId, CancellationToken cancellationToken)
    {
        var products = await _productService.GetByBrandAsync(brandId, cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<ProductDto>>.Ok(products));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<ProductDto>>> Create([FromBody] CreateProductRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var product = await _productService.CreateAsync(request, userId, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, ApiResponse<ProductDto>.Ok(product, "Product created successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ProductDto>>> Update(Guid id, [FromBody] UpdateProductRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var product = await _productService.UpdateAsync(id, request, userId, cancellationToken);
        if (product == null)
        {
            return NotFound(ApiResponse<ProductDto>.Fail("Product not found."));
        }

        return Ok(ApiResponse<ProductDto>.Ok(product, "Product updated successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var removed = await _productService.DeleteAsync(id, userId, cancellationToken);
        if (!removed)
        {
            return NotFound(ApiResponse<string>.Fail("Product not found."));
        }

        return Ok(ApiResponse<string>.Ok("Deleted", "Product deleted successfully"));
    }
}
