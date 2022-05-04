using System;
using book_management_services.Services;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [ApiController]
    [Route("/api/cart/")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            this._cartService = cartService;
        }

        [HttpGet]
        public IActionResult GetCartByUserId(Guid userId)
        {
            var result = _cartService.GetCartByUserId(userId);

            return result != null ? Ok(result) : Ok("Get cart failed!");
        }
    }
}