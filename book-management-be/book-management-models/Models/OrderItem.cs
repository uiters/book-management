using System;

namespace book_management_models
{
    public class OrderItem : BaseModel
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
        public Guid BookId { get; set; }
        public Book Book { get; set; }
        public int Quantity { get; set; }
    }
}