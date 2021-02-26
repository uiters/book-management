using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace book_management_models
{
    public class Book : BaseModel
    {
        public string Title { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public float AvgRating { get; set; }
        public int Pages { get; set; }
        public int Quantity { get; set; }
        public string SKU { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Size { get; set; }
        public Guid AuthorId { get; set; }
        public Author Author { get; set; }
        public Guid PublisherId { get; set; }
        public Publisher Publisher { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}