using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic.CompilerServices;

namespace book_management_models.DTOs.BookDTOs
{
    public class BookForCreateDTO
    {
        [Required]
        public string Title { get; set; }
        [Required]
        [RegularExpression("^[0-9]*$")]
        public int Price { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int Pages { get; set; }
        [Required]
        public string SKU { get; set; }
        [Required]
        public string AuthorName { get; set; }
        [Required]
        public string PublisherName { get; set; }
        [Required]

        public string CategoryName { get; set; }
        public List<IFormFile> Photos { get; set; }
    }
}