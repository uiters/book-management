using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace book_management_models
{
    public class Book : BaseModel
    {
        [Required] public string Title { get; set; }
        [Required] public int Price { get; set; }
        [Required] public string Description { get; set; }
        [Required] public float AvgRating { get; set; }
        [Required] public int Pages { get; set; }
        [Required] public int Quantity { get; set; }
        [Required] public string SKU { get; set; }
        [Required] public string ThumbnailUrl { get; set; }
        public Guid AuthorId { get; set; }
        public Author Author { get; set; }
        public Guid PublisherId { get; set; }
        public Publisher Publisher { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}