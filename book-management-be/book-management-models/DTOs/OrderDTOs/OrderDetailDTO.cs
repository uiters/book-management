using System;
using System.Collections.Generic;
using book_management_models.DTOs.OrderItemDTOs;

namespace book_management_models.DTOs.OrderDTOs
{
    public class OrderDetailDTO
    {
        public ICollection<OrderItemForListDTO> OrderItems { get; set; }
        public int TotalPrice { get; set; }
        public string PaymentMethod { get; set; }
        public string DeliveryOption { get; set; }
        public string Status { get; set; }
        public int ShippingFee { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}