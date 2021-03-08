using System.Threading.Tasks;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;

namespace book_management_persistence.Implements
{
    public class OrderItemRepositoryImpl : BaseRepositoryImpl<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepositoryImpl(AppDbContext context) : base(context)
        {
        }

        public async Task<bool> CreateOrderItem(OrderItem orderItem)
        {
            var result = await this.InsertAsync(orderItem);

            return result;
        }

    }
}