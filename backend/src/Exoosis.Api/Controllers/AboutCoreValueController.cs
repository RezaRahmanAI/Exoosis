using Exoosis.Application.DTOs.About;
using Exoosis.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutCoreValueController : ControllerBase
{
    private readonly IAboutCoreValueService _coreValueService;

    public AboutCoreValueController(IAboutCoreValueService coreValueService)
    {
        _coreValueService = coreValueService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var data = await _coreValueService.GetAllAsync();
        return Ok(new { data });
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var data = await _coreValueService.GetActiveAsync();
        return Ok(new { data });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var data = await _coreValueService.GetByIdAsync(id);
        if (data == null) return NotFound();
        return Ok(new { data });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateAboutCoreValueRequest request)
    {
        var data = await _coreValueService.CreateAsync(request);
        return Ok(new { data });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateAboutCoreValueRequest request)
    {
        var data = await _coreValueService.UpdateAsync(id, request);
        return Ok(new { data });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _coreValueService.DeleteAsync(id);
        if (!success) return NotFound();
        return Ok(new { message = "About core value deleted" });
    }
}
