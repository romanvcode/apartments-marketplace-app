using ApartmentMarketplace.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApartmentMarketplace.Infrastructure.DatabaseContext
{
    public class ApartmentContext : DbContext
    {
        public ApartmentContext(DbContextOptions<ApartmentContext> options) : base(options)
        {
        }

        public DbSet<Apartment> Apartments { get; set; }
    }
}
