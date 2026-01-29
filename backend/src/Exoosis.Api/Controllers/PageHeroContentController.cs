using Exoosis.Application.DTOs.PageHero;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PageHeroContentController : ControllerBase
{
    private readonly IPageHeroContentService _pageHeroService;

    public PageHeroContentController(IPageHeroContentService pageHeroService)
    {
        _pageHeroService = pageHeroService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var data = await _pageHeroService.GetAllAsync();
        return Ok(new { data });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var data = await _pageHeroService.GetByIdAsync(id);
        if (data == null) return NotFound();
        return Ok(new { data });
    }

    [HttpGet("active/{pageKey}")]
    public async Task<IActionResult> GetActive(string pageKey)
    {
        var data = await _pageHeroService.GetActiveByPageKeyAsync(pageKey);
        return Ok(new { data });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePageHeroContentRequest request)
    {
        var data = await _pageHeroService.CreateAsync(request);
        return Ok(new { data });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdatePageHeroContentRequest request)
    {
        var data = await _pageHeroService.UpdateAsync(id, request);
        return Ok(new { data });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _pageHeroService.DeleteAsync(id);
        if (!success) return NotFound();
        return Ok(new { message = "Page hero content deleted" });
    }
}
