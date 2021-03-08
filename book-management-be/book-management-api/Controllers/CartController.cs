using System;
using book_management_services.Services;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [ApiController]
    [Route("/api/cart/")]
    public class CartController : ControllerBase
    {
        private ICartService _cartService;

        public CartController(ICartService cartService)
        {
            this._cartService = cartService;
        }

        [HttpGet]
        public IActionResult GetCartByUserId(Guid userId)
        {
            var result = _cartService.GetCartByUserId(userId);

            if (result != null)
            {
                return Ok(result);
            }

            return Ok("Get cart failed!");
        }
    }
}