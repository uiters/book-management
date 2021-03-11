using System;

namespace book_management_models.DTOs.OrderDTOs
{
    public class OrderForCreateDTO
    {
        public Guid UserId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public DeliveryOption DeliveryOption { get; set; }
        public int ShippingFee { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int TotalPrice { get; set; }
    }
}