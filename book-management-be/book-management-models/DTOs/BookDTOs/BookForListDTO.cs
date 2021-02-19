using System;

namespace book_management_models.DTOs.BookDTOs
{
    public class BookForListDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public float AvgRating { get; set; }
        public int Pages { get; set; }
    }
}