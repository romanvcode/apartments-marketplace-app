using ApartmentMarketplace.Core.Entities;
using ApartmentMarketplace.Core.RepositoryContracts;
using ApartmentMarketplace.Infrastructure.DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace ApartmentMarketplace.Infrastructure.Repositories
{
    public class ApartmentRepository : IApartmentRepository
    {
        private readonly ApartmentContext _context;

        public ApartmentRepository(ApartmentContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Apartment>> GetApartmentsAsync()
        {
            return await _context.Apartments.ToListAsync();
        }

        public async Task<Apartment?> GetApartmentByIdAsync(string id)
        {
            return await _context.Apartments.FindAsync(id);
        }

        public async Task AddApartmentAsync(Apartment apartment)
        {
            apartment.Id = Guid.NewGuid().ToString();

            _context.Apartments.Add(apartment);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateApartmentAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task DeleteApartmentAsync(Apartment apartment)
        {
            _context.Apartments.Remove(apartment);
            await _context.SaveChangesAsync();
        }
    }
}
