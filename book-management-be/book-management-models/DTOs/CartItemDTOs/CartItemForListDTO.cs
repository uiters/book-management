using System;
using book_management_models.DTOs.BookDTOs;

namespace book_management_models.DTOs.CartItemDTOs
{
    public class CartItemForListDTO
    {
        public Guid Id { get; set; }
        public BookForCartDTO Book { get; set; }
        public int Quantity { get; set; }
    }
}