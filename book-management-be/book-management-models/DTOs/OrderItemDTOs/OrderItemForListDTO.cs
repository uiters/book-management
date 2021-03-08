using System;
using book_management_models.DTOs.BookDTOs;

namespace book_management_models.DTOs.OrderItemDTOs
{
    public class OrderItemForListDTO
    {
        public Guid Id { get; set; }
        public BookForCartDTO Book { get; set; }
        public int Quantity { get; set; }
    }
}