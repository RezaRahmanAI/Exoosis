using System.Text.Json;
using Exoosis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Exoosis.Infrastructure.Persistence;

public class ExoosisDbContext : DbContext
{
    public ExoosisDbContext(DbContextOptions<ExoosisDbContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<TeamMember> TeamMembers => Set<TeamMember>();
    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<Solution> Solutions => Set<Solution>();
    public DbSet<User> Users => Set<User>();
    public DbSet<WebsiteSettings> WebsiteSettings => Set<WebsiteSettings>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Testimonial> Testimonials { get; set; }
    public DbSet<HeroContent> HeroContents { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HeroContent>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.BadgeText).HasMaxLength(150);
            entity.Property(x => x.Title).HasMaxLength(250).IsRequired();
            entity.Property(x => x.SubText).HasMaxLength(1000).IsRequired();
            entity.Property(x => x.Image1Url).HasMaxLength(500).IsRequired();
            entity.Property(x => x.Image2Url).HasMaxLength(500).IsRequired();
            entity.Property(x => x.Image3Url).HasMaxLength(500).IsRequired();
            entity.HasQueryFilter(x => !x.IsDeleted);
        });

        var stringListConverter = new ValueConverter<List<string>, string>(
            value => JsonSerializer.Serialize(value ?? new List<string>(), (JsonSerializerOptions?)null),
            value => string.IsNullOrWhiteSpace(value)
                ? new List<string>()
                : JsonSerializer.Deserialize<List<string>>(value, (JsonSerializerOptions?)null) ?? new List<string>());

        var stringListComparer = new ValueComparer<List<string>>(
            (left, right) => (left ?? new List<string>()).SequenceEqual(right ?? new List<string>()),
            value => value == null ? 0 : value.Aggregate(0, (current, item) => HashCode.Combine(current, item.GetHashCode())),
            value => value == null ? new List<string>() : value.ToList());

        var generalConverter = CreateJsonConverter<GeneralSettings>();
        var contactConverter = CreateJsonConverter<ContactSettings>();
        var socialConverter = CreateJsonConverter<SocialSettings>();
        var businessConverter = CreateJsonConverter<BusinessSettings>();
        var seoConverter = CreateJsonConverter<SeoSettings>();

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(500);
            entity.HasIndex(x => x.Name).IsUnique(false);
            entity.HasQueryFilter(x => !x.IsDeleted);
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(500);
            entity.Property(x => x.LogoUrl).HasMaxLength(500);
            entity.HasIndex(x => x.Name).IsUnique(false);
            entity.HasQueryFilter(x => !x.IsDeleted);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(2000);
            entity.Property(x => x.Price).HasColumnType("decimal(18,2)");
            entity.Property(x => x.ImageUrls).HasMaxLength(2000);
            entity.HasIndex(x => x.Name).IsUnique(false);
            entity.HasQueryFilter(x => !x.IsDeleted);

            entity.HasOne(x => x.Category)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Brand)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.BrandId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<TeamMember>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Role).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Bio).HasMaxLength(2000);
            entity.Property(x => x.Quote).HasMaxLength(500);
            entity.Property(x => x.ImageUrl).HasMaxLength(500);
            entity.Property(x => x.LinkedInUrl).HasMaxLength(500);
            entity.HasIndex(x => x.Name).IsUnique(false);
            entity.HasQueryFilter(x => !x.IsDeleted);
        });

        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Title).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Location).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Type).HasMaxLength(50).IsRequired();
            entity.Property(x => x.TypeIcon).HasMaxLength(100).IsRequired();
            entity.Property(x => x.Category).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(4000);
            entity.Property(x => x.Team).HasMaxLength(150);
            entity.Property(x => x.Salary).HasMaxLength(150);
            entity.Property(x => x.DatePosted).HasMaxLength(50);
            entity.Property(x => x.Responsibilities)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.Property(x => x.Requirements)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.HasIndex(x => x.Title).IsUnique(false);
            entity.HasQueryFilter(x => !x.IsDeleted);
        });

        modelBuilder.Entity<Solution>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Summary).HasMaxLength(500);
            entity.Property(x => x.Description).HasMaxLength(4000);
            entity.Property(x => x.Category).HasConversion<string>().IsRequired();
            entity.Property(x => x.ImageUrl).HasMaxLength(500);
            entity.Property(x => x.TechnologyStack)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.HasIndex(x => x.Name).IsUnique(false);
            entity.HasQueryFilter(x => !x.IsDeleted);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.FullName).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Email).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Username).HasMaxLength(100);
            entity.Property(x => x.PasswordHash).HasMaxLength(500).IsRequired();
            entity.Property(x => x.Role).HasMaxLength(50).IsRequired();
            entity.Property(x => x.ProfilePhotoUrl).HasMaxLength(500);
            entity.HasIndex(x => x.Email).IsUnique();
            entity.HasIndex(x => x.Username).IsUnique(false);
            entity.HasQueryFilter(x => !x.IsDeleted);
        });

        modelBuilder.Entity<WebsiteSettings>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.General)
                .HasConversion(generalConverter)
                .HasMaxLength(4000);
            entity.Property(x => x.Contact)
                .HasConversion(contactConverter)
                .HasMaxLength(4000);
            entity.Property(x => x.Social)
                .HasConversion(socialConverter)
                .HasMaxLength(4000);
            entity.Property(x => x.Business)
                .HasConversion(businessConverter)
                .HasMaxLength(4000);
            entity.Property(x => x.Seo)
                .HasConversion(seoConverter)
                .HasMaxLength(4000);
            entity.HasQueryFilter(x => !x.IsDeleted);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasQueryFilter(x => !x.IsDeleted);
            entity.HasMany(x => x.OrderItems)
                .WithOne(x => x.Order)
                .HasForeignKey(x => x.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasQueryFilter(x => !x.IsDeleted);
            entity.HasMany(x => x.Items)
                .WithOne(x => x.Cart)
                .HasForeignKey(x => x.CartId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private static ValueConverter<T, string> CreateJsonConverter<T>() where T : class, new()
    {
        return new ValueConverter<T, string>(
            value => JsonSerializer.Serialize(value ?? new T(), (JsonSerializerOptions?)null),
            value => string.IsNullOrWhiteSpace(value)
                ? new T()
                : JsonSerializer.Deserialize<T>(value, (JsonSerializerOptions?)null) ?? new T());
    }
}
