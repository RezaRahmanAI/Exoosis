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
    public DbSet<Solution> Solutions => Set<Solution>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var stringListConverter = new ValueConverter<List<string>, string>(
            value => JsonSerializer.Serialize(value ?? new List<string>(), (JsonSerializerOptions?)null),
            value => string.IsNullOrWhiteSpace(value)
                ? new List<string>()
                : JsonSerializer.Deserialize<List<string>>(value, (JsonSerializerOptions?)null) ?? new List<string>());

        var stringListComparer = new ValueComparer<List<string>>(
            (left, right) => (left ?? new List<string>()).SequenceEqual(right ?? new List<string>()),
            value => value == null ? 0 : value.Aggregate(0, (current, item) => HashCode.Combine(current, item.GetHashCode())),
            value => value == null ? new List<string>() : value.ToList());

        var supportListConverter = new ValueConverter<List<SolutionSupport>, string>(
            value => JsonSerializer.Serialize(value ?? new List<SolutionSupport>(), (JsonSerializerOptions?)null),
            value => string.IsNullOrWhiteSpace(value)
                ? new List<SolutionSupport>()
                : JsonSerializer.Deserialize<List<SolutionSupport>>(value, (JsonSerializerOptions?)null) ?? new List<SolutionSupport>());

        var supportListComparer = new ValueComparer<List<SolutionSupport>>(
            (left, right) => (left ?? new List<SolutionSupport>()).SequenceEqual(
                right ?? new List<SolutionSupport>(),
                new SolutionSupportComparer()),
            value => value == null ? 0 : value.Aggregate(0, (current, item) => HashCode.Combine(current, item.Label, item.Detail)),
            value => value == null ? new List<SolutionSupport>() : value.Select(item => new SolutionSupport { Label = item.Label, Detail = item.Detail }).ToList());

        var metricListConverter = new ValueConverter<List<SolutionMetric>, string>(
            value => JsonSerializer.Serialize(value ?? new List<SolutionMetric>(), (JsonSerializerOptions?)null),
            value => string.IsNullOrWhiteSpace(value)
                ? new List<SolutionMetric>()
                : JsonSerializer.Deserialize<List<SolutionMetric>>(value, (JsonSerializerOptions?)null) ?? new List<SolutionMetric>());

        var metricListComparer = new ValueComparer<List<SolutionMetric>>(
            (left, right) => (left ?? new List<SolutionMetric>()).SequenceEqual(
                right ?? new List<SolutionMetric>(),
                new SolutionMetricComparer()),
            value => value == null ? 0 : value.Aggregate(0, (current, item) => HashCode.Combine(current, item.Label, item.Value)),
            value => value == null ? new List<SolutionMetric>() : value.Select(item => new SolutionMetric { Label = item.Label, Value = item.Value }).ToList());

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

        modelBuilder.Entity<Solution>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Summary).HasMaxLength(500);
            entity.Property(x => x.Description).HasMaxLength(4000);
            entity.Property(x => x.Category).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Icon).HasMaxLength(100);
            entity.Property(x => x.ImageUrl).HasMaxLength(500);
            entity.Property(x => x.Brands)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.Property(x => x.Capabilities)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.Property(x => x.Industries)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.Property(x => x.Integrations)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.Property(x => x.Compliance)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.Property(x => x.Deployment)
                .HasConversion(stringListConverter)
                .Metadata.SetValueComparer(stringListComparer);
            entity.Property(x => x.Support)
                .HasConversion(supportListConverter)
                .Metadata.SetValueComparer(supportListComparer);
            entity.Property(x => x.Metrics)
                .HasConversion(metricListConverter)
                .Metadata.SetValueComparer(metricListComparer);
            entity.HasIndex(x => x.Name).IsUnique(false);
            entity.HasQueryFilter(x => !x.IsDeleted);
        });
    }

    private sealed class SolutionSupportComparer : IEqualityComparer<SolutionSupport>
    {
        public bool Equals(SolutionSupport? x, SolutionSupport? y)
        {
            if (x is null && y is null)
            {
                return true;
            }

            if (x is null || y is null)
            {
                return false;
            }

            return string.Equals(x.Label, y.Label, StringComparison.Ordinal)
                && string.Equals(x.Detail, y.Detail, StringComparison.Ordinal);
        }

        public int GetHashCode(SolutionSupport obj)
        {
            return HashCode.Combine(obj.Label, obj.Detail);
        }
    }

    private sealed class SolutionMetricComparer : IEqualityComparer<SolutionMetric>
    {
        public bool Equals(SolutionMetric? x, SolutionMetric? y)
        {
            if (x is null && y is null)
            {
                return true;
            }

            if (x is null || y is null)
            {
                return false;
            }

            return string.Equals(x.Label, y.Label, StringComparison.Ordinal)
                && string.Equals(x.Value, y.Value, StringComparison.Ordinal);
        }

        public int GetHashCode(SolutionMetric obj)
        {
            return HashCode.Combine(obj.Label, obj.Value);
        }
    }
}
