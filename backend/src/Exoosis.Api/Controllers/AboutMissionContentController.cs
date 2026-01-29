using Exoosis.Application.DTOs.About;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutMissionContentController : ControllerBase
{
    private readonly IAboutMissionContentService _missionService;

    public AboutMissionContentController(IAboutMissionContentService missionService)
    {
        _missionService = missionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var data = await _missionService.GetAllAsync();
        return Ok(new { data });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var data = await _missionService.GetByIdAsync(id);
        if (data == null) return NotFound();
        return Ok(new { data });
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var data = await _missionService.GetActiveAsync();
        return Ok(new { data });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateAboutMissionContentRequest request)
    {
        var data = await _missionService.CreateAsync(request);
        return Ok(new { data });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateAboutMissionContentRequest request)
    {
        var data = await _missionService.UpdateAsync(id, request);
        return Ok(new { data });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _missionService.DeleteAsync(id);
        if (!success) return NotFound();
        return Ok(new { message = "About mission content deleted" });
    }
}
