using Exoosis.Application.DTOs.Jobs;
using Exoosis.Application.Responses;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/jobs")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<JobDto>>>> GetAll(CancellationToken cancellationToken)
    {
        var jobs = await _jobService.GetAllAsync(cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<JobDto>>.Ok(jobs));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<JobDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var job = await _jobService.GetByIdAsync(id, cancellationToken);
        if (job == null)
        {
            return NotFound(ApiResponse<JobDto>.Fail("Job not found."));
        }

        return Ok(ApiResponse<JobDto>.Ok(job));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<JobDto>>> Create([FromBody] CreateJobRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var job = await _jobService.CreateAsync(request, userId, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = job.Id }, ApiResponse<JobDto>.Ok(job, "Job created successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<JobDto>>> Update(Guid id, [FromBody] UpdateJobRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var job = await _jobService.UpdateAsync(id, request, userId, cancellationToken);
        if (job == null)
        {
            return NotFound(ApiResponse<JobDto>.Fail("Job not found."));
        }

        return Ok(ApiResponse<JobDto>.Ok(job, "Job updated successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var removed = await _jobService.DeleteAsync(id, userId, cancellationToken);
        if (!removed)
        {
            return NotFound(ApiResponse<string>.Fail("Job not found."));
        }

        return Ok(ApiResponse<string>.Ok("Deleted", "Job deleted successfully"));
    }
}
