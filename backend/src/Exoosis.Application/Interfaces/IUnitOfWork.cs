using Exoosis.Domain.Entities;

namespace Exoosis.Application.Interfaces;

public interface IUnitOfWork
{
    IRepository<Category> Categories { get; }
    IRepository<Brand> Brands { get; }
    IRepository<Product> Products { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
