using System.ComponentModel.DataAnnotations;

namespace Exoosis.Domain.Entities;

public class Cart : BaseEntity
{
    [Required]
    public string UserId { get; set; } = string.Empty;

    public List<CartItem> Items { get; set; } = new();
}
