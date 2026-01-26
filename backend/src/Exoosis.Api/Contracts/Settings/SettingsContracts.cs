using Exoosis.Domain.Entities;

namespace Exoosis.Api.Contracts.Settings;

public record WebsiteSettingsResponse(
    GeneralSettings General,
    ContactSettings Contact,
    SocialSettings Social,
    BusinessSettings Business,
    SeoSettings Seo);

public record UpdateSettingsRequest(
    GeneralSettings General,
    ContactSettings Contact,
    SocialSettings Social,
    BusinessSettings Business,
    SeoSettings Seo);
