using ApartmentMarketplace.Core.Entities;
using ApartmentMarketplace.Core.RepositoryContracts;
using ApartmentMarketplace.Core.ServiceContracts;

namespace ApartmentMarketplace.Core.Services
{
    public class ApartmentService : IApartmentService
    {
        private readonly IApartmentRepository _repository;

        public ApartmentService(IApartmentRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Apartment>?> GetApartmentsAsync(string? price, int? rooms)
        {
            var apartments = await _repository.GetApartmentsAsync();

            if (apartments.Count() == 0)
            {
                return null;
            }

            if (!string.IsNullOrEmpty(price))
            {
                if (price.ToLower() == "asc")
                {
                    apartments = apartments.OrderBy(a => a.Price).ToList();
                }
                else if (price.ToLower() == "desc")
                {
                    apartments = apartments.OrderByDescending(a => a.Price).ToList();
                }
            }

            if (rooms.HasValue)
            {
                apartments = apartments.Where(a => a.Rooms == rooms.Value).ToList();
            }

            return apartments;
        }

        public async Task<Apartment?> GetApartmentByIdAsync(string id)
        {
            var apartment = await _repository.GetApartmentByIdAsync(id);

            if (apartment == null)
            {
                return null;
            }

            return apartment;
        }

        public async Task AddApartmentAsync(Apartment apartment)
        {
            await _repository.AddApartmentAsync(apartment);
        }

        public async Task<bool> UpdateApartmentAsync(string id, Apartment apartment)
        {
            var existingApartment = await _repository.GetApartmentByIdAsync(id);
            if (existingApartment == null)
            {
                return false;
            }

            existingApartment.Rooms = apartment.Rooms;
            existingApartment.Name = apartment.Name;
            existingApartment.Price = apartment.Price;
            existingApartment.Description = apartment.Description;

            await _repository.UpdateApartmentAsync();

            return true;
        }

        public async Task<bool> DeleteApartmentAsync(string id)
        {
            var apartment = await _repository.GetApartmentByIdAsync(id);
            if (apartment == null)
            {
                return false;
            }

            await _repository.DeleteApartmentAsync(apartment);

            return true;
        }
    }
}
