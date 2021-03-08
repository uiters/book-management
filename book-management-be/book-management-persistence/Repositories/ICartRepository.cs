using System;
using System.Threading.Tasks;
using book_management_models;

namespace book_management_persistence.Repositories
{
    public interface ICartRepository : IBaseRepository<Cart>
    {
        Cart GetCartByUserId(Guid userId);
        Task<bool> AddCart(Cart cart);
        Task<Cart> FindCartByUserId(Guid userId);
        bool IsCartItemExist(Guid userId);
    }
}