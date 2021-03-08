using System.Collections.Generic;
using book_management_models.DTOs.CartItemDTOs;

namespace book_management_models.DTOs.CartDTOs
{
    public class CartForListDTO
    {
        public List<CartItemForListDTO> CartItems { get; set; }
        public int TotalPrice { get; set; }
    }
}