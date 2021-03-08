using System;

namespace book_management_models.DTOs.BookDTOs
{
    public class BookForUpdateDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Pages { get; set; }
        public string SKU { get; set; }
    }
}