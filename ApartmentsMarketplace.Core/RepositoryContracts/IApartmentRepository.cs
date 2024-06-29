using ApartmentMarketplace.Core.Entities;

namespace ApartmentMarketplace.Core.RepositoryContracts
{
    public interface IApartmentRepository
    {
        Task<IEnumerable<Apartment>> GetApartmentsAsync();
        Task<Apartment?> GetApartmentByIdAsync(string id);
        Task AddApartmentAsync(Apartment apartment);
        Task UpdateApartmentAsync();
        Task DeleteApartmentAsync(Apartment apartment);
    }
}
