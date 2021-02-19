using System;

namespace book_management_models
{
    public class CartItem : BaseModel
    {
        public Guid BookId { get; set; }
        public Book Book { get; set; }
        public Guid CartId { get; set; }
        public Cart Cart { get; set; }
        public int Quantity { get; set; }
    }
}