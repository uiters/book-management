using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;

namespace book_management_persistence.Repositories
{
    public interface ICartItemRepository : IBaseRepository<CartItem>
    {
        Task<bool> AddToCart(CartItem item);
        Task<IEnumerable<CartItem>> GetByUserId(Guid userId);
    }
}