using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;
using book_management_models.DTOs.OrderDTOs;

namespace book_management_services.Services
{
    public interface IOrderService
    {
        Task<bool> CreateOrder(Guid userId);
        IEnumerable<Order> GetListOrder(Guid userId);
        Task<OrderDetailDTO> GetOrderById(Guid orderId);
    }
}