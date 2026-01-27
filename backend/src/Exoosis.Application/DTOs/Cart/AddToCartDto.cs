using System;
using System.ComponentModel.DataAnnotations;

namespace Exoosis.Application.DTOs.Cart;

public class AddToCartDto
{
    [Required]
    public string UserId { get; set; } = string.Empty;

    [Required]
    public Guid ProductId { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
    public int Quantity { get; set; }
}
