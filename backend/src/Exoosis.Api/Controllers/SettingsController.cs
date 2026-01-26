using Exoosis.Api.Contracts.Settings;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/settings")]
public class SettingsController : ControllerBase
{
    private readonly ExoosisDbContext _dbContext;

    public SettingsController(ExoosisDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("public")]
    public async Task<ActionResult<WebsiteSettingsResponse>> GetPublicSettings(CancellationToken cancellationToken)
    {
        var settings = await GetSettingsAsync(cancellationToken);
        return Ok(Map(settings));
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<WebsiteSettingsResponse>> GetAllSettings(CancellationToken cancellationToken)
    {
        var settings = await GetSettingsAsync(cancellationToken);
        return Ok(Map(settings));
    }

    [HttpGet("{category}")]
    public async Task<IActionResult> GetByCategory(string category, CancellationToken cancellationToken)
    {
        var settings = await GetSettingsAsync(cancellationToken);
        return category.ToLowerInvariant() switch
        {
            "general" => Ok(settings.General),
            "contact" => Ok(settings.Contact),
            "social" => Ok(settings.Social),
            "business" => Ok(settings.Business),
            "seo" => Ok(settings.Seo),
            _ => NotFound("Unknown category.")
        };
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<WebsiteSettingsResponse>> Update(UpdateSettingsRequest request, CancellationToken cancellationToken)
    {
        var settings = await GetSettingsAsync(cancellationToken);
        settings.General = request.General;
        settings.Contact = request.Contact;
        settings.Social = request.Social;
        settings.Business = request.Business;
        settings.Seo = request.Seo;
        settings.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return Ok(Map(settings));
    }

    private async Task<WebsiteSettings> GetSettingsAsync(CancellationToken cancellationToken)
    {
        var settings = await _dbContext.WebsiteSettings.FirstOrDefaultAsync(cancellationToken);
        if (settings != null)
        {
            return settings;
        }

        settings = new WebsiteSettings
        {
            General = new GeneralSettings
            {
                WebsiteName = "EXOSISTECH",
                Tagline = "Enterprise IT & Digital Transformation",
                LogoUrl = "logo.png",
                FooterLogoUrl = "logo.png",
                FaviconUrl = "logo.png",
                DefaultLanguage = "en",
                Currency = "USD",
                Timezone = "Asia/Dhaka"
            },
            Contact = new ContactSettings
            {
                Address = "Rahmania International Complex",
                City = "Motijheel",
                State = "Dhaka",
                PostalCode = "1000",
                Country = "Bangladesh",
                PrimaryPhone = "+880 1234 567890",
                SecondaryPhone = "+880 9876 543210",
                SupportPhone = "+880 1111 222333",
                GeneralEmail = "hello@exosistech.com",
                SalesEmail = "sales@exosistech.com",
                SupportEmail = "support@exosistech.com"
            },
            Social = new SocialSettings
            {
                FacebookUrl = "https://facebook.com",
                TwitterUrl = "https://twitter.com",
                LinkedinUrl = "https://linkedin.com",
                InstagramUrl = "https://instagram.com",
                YoutubeUrl = "https://youtube.com"
            },
            Business = new BusinessSettings
            {
                Description = "Leading the way in enterprise IT solutions and digital transformation for global businesses.",
                FoundedYear = 2012,
                RegistrationNumber = "EXO-REG-2012",
                TaxId = "TAX-EXO-5522",
                WorkingHours = "Sun-Thu: 9:00 AM - 7:00 PM",
                PaymentMethods = new List<string> { "Visa", "Mastercard", "PayPal", "Bank Transfer" }
            },
            Seo = new SeoSettings
            {
                DefaultMetaTitle = "EXOSISTECH | Enterprise IT Solutions",
                DefaultMetaDescription = "Enterprise-grade hardware, networking, and digital transformation services.",
                MetaKeywords = "enterprise IT, hardware, networking, security, digital transformation",
                GoogleAnalyticsId = string.Empty,
                FacebookPixelId = string.Empty,
                GoogleTagManagerId = string.Empty
            }
        };

        _dbContext.WebsiteSettings.Add(settings);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return settings;
    }

    private static WebsiteSettingsResponse Map(WebsiteSettings settings)
    {
        return new WebsiteSettingsResponse(
            settings.General,
            settings.Contact,
            settings.Social,
            settings.Business,
            settings.Seo);
    }
}
