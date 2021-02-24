﻿using System;

namespace book_management_models.DTOs.BookDTOs
{
    public class BookForCreateDTO
    {
        public string Title { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int Pages { get; set; }
        public string SKU { get; set; }
        public string AuthorName { get; set; }
        public string PublisherName { get; set; }
    }
}