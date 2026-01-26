using Exoosis.Application.DTOs.TeamMembers;

namespace Exoosis.Application.Services;

public interface ITeamMemberService
{
    Task<IReadOnlyList<TeamMemberDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyList<TeamMemberDto>> GetBySectionAsync(string section, CancellationToken cancellationToken = default);
    Task<TeamMemberDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<TeamMemberDto> CreateAsync(CreateTeamMemberRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<TeamMemberDto?> UpdateAsync(Guid id, UpdateTeamMemberRequest request, string? userId, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default);
}
