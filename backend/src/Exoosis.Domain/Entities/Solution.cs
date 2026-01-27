using Exoosis.Domain.Enums;

namespace Exoosis.Domain.Entities;

public class Solution : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string? Description { get; set; }
    public SolutionCategory Category { get; set; }
    public string? ImageUrl { get; set; }
    public List<string> TechnologyStack { get; set; } = new();
}
