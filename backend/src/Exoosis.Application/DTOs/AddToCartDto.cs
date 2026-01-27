using System.ComponentModel.DataAnnotations;

namespace Exoosis.Application.DTOs;

public class AddToCartDto
{
    [Required]
    public Guid ProductId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; } = 1;

    // Optional fields for UI optimism, though backend fetches truth
    public string? Name { get; set; }
    public decimal? Price { get; set; }
    public string? Image { get; set; }
}
