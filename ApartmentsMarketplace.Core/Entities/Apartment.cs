using System.ComponentModel.DataAnnotations;

namespace ApartmentMarketplace.Core.Entities
{
    public class Apartment
    {
        public string? Id { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Rooms number must be grater than 0")]
        public int Rooms { get; set; }

        [MaxLength(99)]
        public string? Name { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Price must be grater than 0")]
        public int Price { get; set; }

        [MaxLength(999)]
        public string? Description { get; set; }
    }
}
