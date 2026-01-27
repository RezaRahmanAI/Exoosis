using System;
using System.Collections.Generic;

namespace Exoosis.Application.DTOs.Cart;

public class CartDto
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public List<CartItemDto> Items { get; set; } = new();
    public decimal GrandTotal { get; set; }
}
