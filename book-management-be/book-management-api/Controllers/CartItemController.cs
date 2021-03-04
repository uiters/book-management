using System;
using System.Threading.Tasks;
using book_management_models.DTOs.CartItemDTOs;
using book_management_services.Services;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [ApiController]
    [Route("/api/cart-item/")]
    public class CartItemController : ControllerBase
    {
        private ICartItemService _cartItemService;

        public CartItemController(ICartItemService cartItemService)
        {
            this._cartItemService = cartItemService;
        }

        [HttpPost("")]
        public async Task<IActionResult> AddToCart([FromBody] CartItemForCreateDTO item)
        {
            var result = await _cartItemService.AddCartItem(item);

            if (result)
            {
                return Ok("Add new item to cart successfull!");
            }

            return Ok("Add cart item failed! Please try again!");
        }

        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteCartItem(Guid itemId)
        {
            var result = await _cartItemService.DeleteCartItem(itemId);

            if (result)
            {
                return Ok("Delete cart item successfull!");
            }

            return Ok("Delete cart item failed! Please check item id and try again!");
        }

        [HttpGet("")]
        public async Task<IActionResult> GetCartItemsByUserId(Guid userId)
        {
            var result = await _cartItemService.GetByUserId(userId);

            if (result != null)
            {
                return Ok(result);
            }

            return Ok("Result is empty please try again!");
        }
    }
}