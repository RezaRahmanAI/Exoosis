using Exoosis.Application.DTOs.TeamMembers;
using Exoosis.Application.Responses;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/team")]
public class TeamMembersController : ControllerBase
{
    private readonly ITeamMemberService _teamMemberService;

    public TeamMembersController(ITeamMemberService teamMemberService)
    {
        _teamMemberService = teamMemberService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<TeamMemberDto>>>> GetAll(CancellationToken cancellationToken)
    {
        var team = await _teamMemberService.GetAllAsync(cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<TeamMemberDto>>.Ok(team));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<TeamMemberDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var member = await _teamMemberService.GetByIdAsync(id, cancellationToken);
        if (member == null)
        {
            return NotFound(ApiResponse<TeamMemberDto>.Fail("Team member not found."));
        }

        return Ok(ApiResponse<TeamMemberDto>.Ok(member));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<TeamMemberDto>>> Create([FromBody] CreateTeamMemberRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var member = await _teamMemberService.CreateAsync(request, userId, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = member.Id }, ApiResponse<TeamMemberDto>.Ok(member, "Team member created successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<TeamMemberDto>>> Update(Guid id, [FromBody] UpdateTeamMemberRequest request, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var member = await _teamMemberService.UpdateAsync(id, request, userId, cancellationToken);
        if (member == null)
        {
            return NotFound(ApiResponse<TeamMemberDto>.Fail("Team member not found."));
        }

        return Ok(ApiResponse<TeamMemberDto>.Ok(member, "Team member updated successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = User?.Identity?.Name;
        var removed = await _teamMemberService.DeleteAsync(id, userId, cancellationToken);
        if (!removed)
        {
            return NotFound(ApiResponse<string>.Fail("Team member not found."));
        }

        return Ok(ApiResponse<string>.Ok("Deleted", "Team member deleted successfully"));
    }
}
