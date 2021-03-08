using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using book_management_helpers.CustomException;
using book_management_services.Services;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [ApiController]
    [Route("/api/order/")]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            this._orderService = orderService;
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateOrder(Guid userId)
        {
            var result = await _orderService.CreateOrder(userId);

            if (!result)
            {
                throw new CreateFailResultException(HttpStatusCode.BadRequest, "Create order failed! Please check again cart items, and try again!");
            }

            return Ok("Create order successfull!");
        }

        [HttpGet()]
        public IActionResult GetListOrder([FromQuery] Guid userId)
        {
            var result = _orderService.GetListOrder(userId);

            if (result == null)
            {
                throw new MyEmptyResultException(HttpStatusCode.BadRequest, "Can't find order! Please try again later!");
            }

            return Ok(result);
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById(Guid orderId)
        {
            var result = await _orderService.GetOrderById(orderId);

            if (result == null)
            {
                throw new NullResultException(HttpStatusCode.NotAcceptable, "Can't find order you requested! Please try again later!");
            }

            return Ok(result);
        }
    }
}