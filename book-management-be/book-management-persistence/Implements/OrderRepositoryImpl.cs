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
    public class OrderRepositoryImpl : BaseRepositoryImpl<Order>, IOrderRepository
    {
        public OrderRepositoryImpl(AppDbContext context) : base(context)
        {
        }

        public async Task<bool> CreateOrder(Order newOrder)
        {
            var result = await this.InsertAsync(newOrder);

            return result;
        }

        public IEnumerable<Order> GetListOrder(Guid userId)
        {
            var orders = DbSet.Where(o => o.UserId.Equals(userId)).OrderByDescending(o => o.CreatedAt).ToList();

            return orders;
        }

        public async Task<Order> GetOrderById(Guid orderId)
        {
            var order = await DbSet.Where(o => o.Id.Equals(orderId)).Include(o => o.OrderItems).ThenInclude(ot => ot.Book).FirstOrDefaultAsync();

            return order;
        }
    }
}