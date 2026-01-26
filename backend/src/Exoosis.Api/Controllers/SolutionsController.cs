using Exoosis.Application.DTOs.Solutions;
using Exoosis.Application.Responses;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/solutions")]
public class SolutionsController : ControllerBase
{
    private readonly ISolutionService _solutionService;

    public SolutionsController(ISolutionService solutionService)
    {
        _solutionService = solutionService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<SolutionDto>>>> GetAll([FromQuery] string? industry, CancellationToken cancellationToken)
    {
        var solutions = await _solutionService.GetAllAsync(industry, cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<SolutionDto>>.Ok(solutions));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<SolutionDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var solution = await _solutionService.GetByIdAsync(id, cancellationToken);
        if (solution == null)
        {
            return NotFound(ApiResponse<SolutionDto>.Fail("Solution not found."));
        }

        return Ok(ApiResponse<SolutionDto>.Ok(solution));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<SolutionDto>>> Create([FromBody] CreateSolutionRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var solution = await _solutionService.CreateAsync(request, userId, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = solution.Id }, ApiResponse<SolutionDto>.Ok(solution, "Solution created successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<SolutionDto>>> Update(Guid id, [FromBody] UpdateSolutionRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var solution = await _solutionService.UpdateAsync(id, request, userId, cancellationToken);
        if (solution == null)
        {
            return NotFound(ApiResponse<SolutionDto>.Fail("Solution not found."));
        }

        return Ok(ApiResponse<SolutionDto>.Ok(solution, "Solution updated successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var removed = await _solutionService.DeleteAsync(id, userId, cancellationToken);
        if (!removed)
        {
            return NotFound(ApiResponse<string>.Fail("Solution not found."));
        }

        return Ok(ApiResponse<string>.Ok("Deleted", "Solution deleted successfully"));
    }
}
