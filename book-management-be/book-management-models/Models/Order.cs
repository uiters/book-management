using System;
using System.Collections.Generic;

namespace book_management_models
{
    public class Order : BaseModel
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public DateTime DeliveryDate { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public int TotalPrice { get; set; }
    }
}