using Exoosis.Application.DTOs.Hero;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HeroContentController : ControllerBase
{
    private readonly IHeroContentService _heroService;

    public HeroContentController(IHeroContentService heroService)
    {
        _heroService = heroService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var data = await _heroService.GetAllAsync();
        return Ok(new { data });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var data = await _heroService.GetByIdAsync(id);
        if (data == null) return NotFound();
        return Ok(new { data });
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var data = await _heroService.GetActiveHeroAsync();
        return Ok(new { data });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateHeroContentRequest request)
    {
        var data = await _heroService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = data.Id }, new { data });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateHeroContentRequest request)
    {
        try
        {
            var data = await _heroService.UpdateAsync(id, request);
            return Ok(new { data });
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _heroService.DeleteAsync(id);
        if (!result) return NotFound();
        return Ok(new { data = "Deleted successfully" });
    }
}
