using System.ComponentModel.DataAnnotations;

namespace Exoosis.Domain.Entities;

public class RespectedClient : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty;

    public string LogoUrl { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true;
}
