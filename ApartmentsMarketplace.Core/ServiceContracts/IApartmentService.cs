using ApartmentMarketplace.Core.Entities;

namespace ApartmentMarketplace.Core.ServiceContracts
{
    public interface IApartmentService
    {
        Task<IEnumerable<Apartment>?> GetApartmentsAsync(string? price, int? rooms);
        Task<Apartment?> GetApartmentByIdAsync(string id);
        Task AddApartmentAsync(Apartment apartment);
        Task<bool> UpdateApartmentAsync(string id, Apartment apartment);
        Task<bool> DeleteApartmentAsync(string id);
    }
}
