using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using book_management_helpers.CustomException;
using book_management_models.DTOs.OrderDTOs;
using book_management_services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/order/")]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            this._orderService = orderService;
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderForCreateDTO order)
        {
            if (!ModelState.IsValid)
            {
                throw new CreateFailResultException(HttpStatusCode.NotAcceptable, "Input DTO validate failed!");
            }

            var result = await _orderService.CreateOrder(order);

            if (!result.Result)
            {
                throw new CreateFailResultException(HttpStatusCode.BadRequest, result.ResultMessage);
            }

            return Ok(result.NewOrderId);
        }

        [HttpGet()]
        public IActionResult GetListOrder([FromQuery] Guid userId)
        {
            var result = _orderService.GetListOrder(userId);

            if (result == null)
            {
                throw new MyEmptyResultException(HttpStatusCode.BadRequest,
                    "Can't find order! Please try again later!");
            }

            return Ok(result);
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById(Guid orderId)
        {
            var result = await _orderService.GetOrderById(orderId);

            if (result == null)
            {
                throw new NullResultException(HttpStatusCode.NotAcceptable,
                    "Can't find order you requested! Please try again later!");
            }

            return Ok(result);
        }
    }
}