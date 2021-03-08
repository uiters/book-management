using System.Threading.Tasks;
using book_management_models;
using book_management_persistence.Repositories;

namespace book_management_persistence.Repositories
{
    public interface IOrderItemRepository : IBaseRepository<OrderItem>
    {
        Task<bool> CreateOrderItem(OrderItem cartItem);
    }
}