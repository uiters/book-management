using System;

namespace book_management_models.DTOs.OrderDTOs
{
    public class OrderForListDTO
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TotalPrice { get; set; }
        public string Status { get; set; }
    }
}