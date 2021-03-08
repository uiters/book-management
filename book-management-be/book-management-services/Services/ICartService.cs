using System;
using System.Threading.Tasks;
using book_management_models;
using book_management_models.DTOs.CartDTOs;

namespace book_management_services.Services
{
    public interface ICartService
    {
        Task<bool> AddCart(Cart cart);
        CartForListDTO GetCartByUserId(Guid userId);
    }
}