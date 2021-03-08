using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;

namespace book_management_persistence.Repositories
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        Task<bool> CreateOrder(Order newOrder);
        IEnumerable<Order> GetListOrder(Guid userId);
        Task<Order> GetOrderById(Guid orderId);
    }
}