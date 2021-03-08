using System;
using System.Collections.Generic;
using book_management_models.DTOs.AuthorDTOs;
using book_management_models.DTOs.CategoryDTOs;
using book_management_models.DTOs.PublisherDTOs;

namespace book_management_models.DTOs.BookDTOs
{
    public class BookForListDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public float AvgRating { get; set; }
        public int Pages { get; set; }
        public string ThumbnailUrl { get; set; }
        public int Quantity { get; set; }
        public string SKU { get; set; }
        public List<CategoryViewModel> Categories { get; set; }
        public AuthorForListDTO Author { get; set; }
        public PublisherForListDTO Publisher { get; set; }
        public List<Photo> Photos { get; set; }
    }
}