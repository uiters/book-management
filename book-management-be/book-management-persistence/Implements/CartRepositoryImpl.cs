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

        public Cart GetCartByUserId(Guid userId)
        {
            var cart = DbSet.Where(c => c.UserId.Equals(userId)).Include(c => c.CartItems).FirstOrDefault();

            if (cart != null)
            {
                var totalPrice = 0;
                foreach (var cartItem in cart.CartItems)
                {
                    var book = Context.Books.FirstOrDefault(b => b.Id.Equals(cartItem.BookId));
                    totalPrice += cartItem.Quantity * book.Price;
                }

                cart.TotalPrice = totalPrice;
                return cart;
            }
            
            return null;
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

        public bool IsCartItemExist(Guid userId)
        {
            var cart = DbSet.Include(c => c.CartItems).FirstOrDefault(c => c.UserId.Equals(userId));

            var test = cart.CartItems.Any();

            if (cart.CartItems.Any())
            {
                return true;
            }

            return false;
        }
    }
}