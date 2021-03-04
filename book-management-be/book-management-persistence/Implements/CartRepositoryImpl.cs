using System;
using System.Linq;
using System.Threading.Tasks;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace book_management_persistence.Implements
{
    public class CartRepositoryImpl: BaseRepositoryImpl<Cart>, ICartRepository
    {
        public CartRepositoryImpl(AppDbContext context) : base(context)
        {
        }

        public async Task<bool> AddCart(Cart cart)
        {
            var result = await this.InsertAsync(cart);

            return result;
        }

        public async Task<Cart> FindCartByUserId(Guid userId)
        {
            var cart = await this.DbSet.FirstOrDefaultAsync(c => c.UserId.Equals(userId));
            
            return cart;
        }
    }
}