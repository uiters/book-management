using System;

namespace book_management_models.DTOs.BookDTOs
{
    public class BookForCartDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public string ThumbnailUrl { get; set; }
    }
}