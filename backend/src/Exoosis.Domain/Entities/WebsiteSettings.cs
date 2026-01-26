namespace Exoosis.Domain.Entities;

public class WebsiteSettings : BaseEntity
{
    public GeneralSettings General { get; set; } = new();
    public ContactSettings Contact { get; set; } = new();
    public SocialSettings Social { get; set; } = new();
    public BusinessSettings Business { get; set; } = new();
    public SeoSettings Seo { get; set; } = new();
}

public class GeneralSettings
{
    public string WebsiteName { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string FooterLogoUrl { get; set; } = string.Empty;
    public string FaviconUrl { get; set; } = string.Empty;
    public string DefaultLanguage { get; set; } = string.Empty;
    public string Currency { get; set; } = string.Empty;
    public string Timezone { get; set; } = string.Empty;
}

public class ContactSettings
{
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string PrimaryPhone { get; set; } = string.Empty;
    public string SecondaryPhone { get; set; } = string.Empty;
    public string SupportPhone { get; set; } = string.Empty;
    public string GeneralEmail { get; set; } = string.Empty;
    public string SalesEmail { get; set; } = string.Empty;
    public string SupportEmail { get; set; } = string.Empty;
}

public class SocialSettings
{
    public string FacebookUrl { get; set; } = string.Empty;
    public string TwitterUrl { get; set; } = string.Empty;
    public string LinkedinUrl { get; set; } = string.Empty;
    public string InstagramUrl { get; set; } = string.Empty;
    public string YoutubeUrl { get; set; } = string.Empty;
}

public class BusinessSettings
{
    public string Description { get; set; } = string.Empty;
    public int FoundedYear { get; set; }
    public string RegistrationNumber { get; set; } = string.Empty;
    public string TaxId { get; set; } = string.Empty;
    public string WorkingHours { get; set; } = string.Empty;
    public List<string> PaymentMethods { get; set; } = new();
}

public class SeoSettings
{
    public string DefaultMetaTitle { get; set; } = string.Empty;
    public string DefaultMetaDescription { get; set; } = string.Empty;
    public string MetaKeywords { get; set; } = string.Empty;
    public string GoogleAnalyticsId { get; set; } = string.Empty;
    public string FacebookPixelId { get; set; } = string.Empty;
    public string GoogleTagManagerId { get; set; } = string.Empty;
}
