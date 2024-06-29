using ApartmentMarketplace.Core.Entities;
using ApartmentMarketplace.Core.ServiceContracts;
using Microsoft.AspNetCore.Mvc;

namespace ApartmentMarketplace.WebAPI.Controllers
{
    [Route("apartments")]
    [ApiController]
    public class ApartmentController : ControllerBase
    {
        private readonly IApartmentService _service;

        public ApartmentController(IApartmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Apartment>>> GetApartments(string? price, int? rooms)
        {
            var apartments = await _service.GetApartmentsAsync(price, rooms);

            if (apartments == null)
            {
                return Problem("No apartments found", null, 404);
            }

            return Ok(apartments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Apartment>> GetApartment(string id)
        {
            var apartment = await _service.GetApartmentByIdAsync(id);

            if (apartment == null)
            {
                return Problem($"No apartment found with id {id}", null, 404);
            }

            return Ok(apartment);
        }

        [HttpPost]
        public async Task<ActionResult> AddApartment(Apartment apartment)
        {
            await _service.AddApartmentAsync(apartment);

            return CreatedAtAction(nameof(GetApartment), new { id = apartment.Id }, apartment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApartment(string id, Apartment apartment)
        {
            var isUpdated = await _service.UpdateApartmentAsync(id, apartment);

            if (!isUpdated)
            {
                return Problem($"No apartment found with id {id}", null, 404);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApartment(string id)
        {
            var isDeleted = await _service.DeleteApartmentAsync(id);

            if (!isDeleted)
            {
                return Problem($"No apartment found with id {id}", null, 404);
            }

            return NoContent();
        }
    }
}
