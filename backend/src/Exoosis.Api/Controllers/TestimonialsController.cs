using Exoosis.Application.Responses;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/testimonials")]
public class TestimonialsController : ControllerBase
{
    private readonly ExoosisDbContext _context;

    public TestimonialsController(ExoosisDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<Testimonial>>>> GetAll(CancellationToken cancellationToken)
    {
        var testimonials = await _context.Testimonials
            .Where(t => t.IsActive)
            .ToListAsync(cancellationToken);

        if (!testimonials.Any())
        {
            // Seed default testimonials if empty
            testimonials = new List<Testimonial>
            {
                new Testimonial
                {
                    Quote = "Exoosis delivered a seamless infrastructure refresh with zero downtime and proactive support.",
                    Author = "Aminul Islam",
                    Role = "IT Operations Manager",
                    Company = "Delta Logistics",
                    Image = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                },
                new Testimonial
                {
                    Quote = "Their team helped us modernize our workplace tech stack while keeping costs predictable.",
                    Author = "Nusrat Jahan",
                    Role = "Procurement Lead",
                    Company = "Skyline Holdings",
                    Image = "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80"
                },
                new Testimonial
                {
                    Quote = "From hardware sourcing to deployment, Exoosis handled every detail with precision.",
                    Author = "Musa Rahman",
                    Role = "Head of Infrastructure",
                    Company = "Nexa Bank",
                    Image = "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80"
                }
            };
            
            _context.Testimonials.AddRange(testimonials);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return Ok(ApiResponse<List<Testimonial>>.Ok(testimonials));
    }
}
