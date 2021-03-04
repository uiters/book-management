using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace book_management_persistence.Implements
{
    public class CartItemRepositoryImpl : BaseRepositoryImpl<CartItem>, ICartItemRepository
    {
        public CartItemRepositoryImpl(AppDbContext context) : base(context)
        {
        }

        public async Task<bool> AddToCart(CartItem item)
        {
            //item is exist in cart => add quantity
            var curItem = await DbSet.FirstOrDefaultAsync(c => c.BookId.Equals(item.BookId) && c.CartId.Equals(item.CartId));
            if (curItem != null)
            {
                curItem.Quantity += item.Quantity;
                await this.UpdateAsync(curItem);
                return true;
            }
            
            var result = await this.InsertAsync(item);

            return result;
        }

        public async Task<IEnumerable<CartItem>> GetByUserId(Guid userId)
        {
            var cart = Context.Carts.FirstOrDefault(c => c.UserId.Equals(userId));
            var result = await DbSet.Where(ci => ci.CartId.Equals(cart.Id)).Include(ci => ci.Book).ToListAsync();

            return result;
        }
    }
}