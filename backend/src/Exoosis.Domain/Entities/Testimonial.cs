using System.ComponentModel.DataAnnotations;

namespace Exoosis.Domain.Entities;

public class Testimonial : BaseEntity
{
    [Required]
    public string Quote { get; set; } = string.Empty;

    [Required]
    public string Author { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public string Company { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true;
}
