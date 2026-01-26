namespace Exoosis.Application.DTOs.TeamMembers;

public class CreateTeamMemberRequest
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? Quote { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsLeadership { get; set; }
    public string? LinkedInUrl { get; set; }
    public bool IsActive { get; set; } = true;
}
