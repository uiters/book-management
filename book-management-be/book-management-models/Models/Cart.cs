using System;
using System.Collections.Generic;

namespace book_management_models
{
    public class Cart : BaseModel
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
        public int TotalPrice { get; set; }
    }
}