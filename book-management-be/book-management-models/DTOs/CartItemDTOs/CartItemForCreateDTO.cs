using System;

namespace book_management_models.DTOs.CartItemDTOs
{
    public class CartItemForCreateDTO
    {
        public Guid UserId { get; set; }
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
    }
}