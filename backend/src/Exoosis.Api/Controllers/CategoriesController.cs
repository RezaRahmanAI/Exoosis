using Exoosis.Application.DTOs.Categories;
using Exoosis.Application.Responses;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<CategoryDto>>>> GetAll(CancellationToken cancellationToken)
    {
        var categories = await _categoryService.GetAllAsync(cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<CategoryDto>>.Ok(categories));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<CategoryDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var category = await _categoryService.GetByIdAsync(id, cancellationToken);
        if (category == null)
        {
            return NotFound(ApiResponse<CategoryDto>.Fail("Category not found."));
        }

        return Ok(ApiResponse<CategoryDto>.Ok(category));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<CategoryDto>>> Create([FromBody] CreateCategoryRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var category = await _categoryService.CreateAsync(request, userId, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = category.Id }, ApiResponse<CategoryDto>.Ok(category, "Category created successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<CategoryDto>>> Update(Guid id, [FromBody] UpdateCategoryRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var category = await _categoryService.UpdateAsync(id, request, userId, cancellationToken);
        if (category == null)
        {
            return NotFound(ApiResponse<CategoryDto>.Fail("Category not found."));
        }

        return Ok(ApiResponse<CategoryDto>.Ok(category, "Category updated successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var removed = await _categoryService.DeleteAsync(id, userId, cancellationToken);
        if (!removed)
        {
            return NotFound(ApiResponse<string>.Fail("Category not found."));
        }

        return Ok(ApiResponse<string>.Ok("Deleted", "Category deleted successfully"));
    }
}
