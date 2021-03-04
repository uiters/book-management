using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;
using book_management_models.DTOs.CartItemDTOs;

namespace book_management_services.Services
{
    public interface ICartItemService
    {
        Task<bool> AddCartItem(CartItemForCreateDTO item);
        Task<bool> DeleteCartItem(Guid itemId);
        Task<IEnumerable<CartItemForListDTO>> GetByUserId(Guid userId);
    }
}