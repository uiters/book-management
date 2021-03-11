using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;
using book_management_models.DTOs.OrderDTOs;
using book_management_models.ServiceResults;

namespace book_management_services.Services
{
    public interface IOrderService
    {
        Task<CreateResult> CreateOrder(OrderForCreateDTO order);
        IEnumerable<OrderForListDTO> GetListOrder(Guid userId);
        Task<OrderDetailDTO> GetOrderById(Guid orderId);
    }
}