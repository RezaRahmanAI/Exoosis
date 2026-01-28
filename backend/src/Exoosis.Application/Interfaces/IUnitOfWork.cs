using Exoosis.Domain.Entities;

namespace Exoosis.Application.Interfaces;

public interface IUnitOfWork
{
    IRepository<Category> Categories { get; }
    IRepository<Brand> Brands { get; }
    IRepository<Product> Products { get; }
    IRepository<TeamMember> TeamMembers { get; }
    IRepository<Job> Jobs { get; }
    IRepository<Solution> Solutions { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
