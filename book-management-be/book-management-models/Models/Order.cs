using System;
using System.Collections.Generic;

namespace book_management_models
{
    public enum OrderStatus
    {
        Recorded = 1,
        Shipping = 2,
        Received = 3,
        Canceled = 4,
    }

    public enum DeliveryOption
    {
        DelieredIn4Hours = 1,
        DeliveredInDay = 2,
        StandardDelivery = 3,
    }

    public enum PaymentMethod
    {
        COD = 1,
        DebitCard = 2
    }
    
    public class Order : BaseModel
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public DateTime DeliveryDate { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public int TotalPrice { get; set; }
        public OrderStatus Status { get; set; }
        public DeliveryOption DeliveryOption { get; set; }
        public int ShippingFee { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}