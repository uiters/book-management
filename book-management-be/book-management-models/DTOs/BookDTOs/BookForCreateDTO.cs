using System;

namespace book_management_models.DTOs.BookDTOs
{
    public class BookForCreateDTO
    {
        public string Title { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public float AvgRating { get; set; }
        public int Pages { get; set; }
        public int Quantity { get; set; }
        public string SKU { get; set; }
        public string ThumbnailUrl { get; set; }
        public Guid AuthorId { get; set; }
        public Guid PublisherId { get; set; }
    }
}