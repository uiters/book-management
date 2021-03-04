using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using book_management_models;
using book_management_models.DTOs.CartItemDTOs;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;

namespace book_management_services.Implements
{
    public class CartItemServiceImpl : ICartItemService
    {
        private IUnitOfWorks _unitOfWorks;
        private CartItemRepositoryImpl _cartItemRepo;
        private IMapper _mapper;
        private CartRepositoryImpl _cartRepo;

        public CartItemServiceImpl(IUnitOfWorks unitOfWorks, IMapper mapper)
        {
            this._unitOfWorks = unitOfWorks;
            this._cartItemRepo = this._unitOfWorks.CartItemRepository();
            this._cartRepo = this._unitOfWorks.CartRepository();
            this._mapper = mapper;
        }

        public async Task<bool> AddCartItem(CartItemForCreateDTO item)
        {
            var cartItem = _mapper.Map<CartItem>(item);
            
            //Find cart of user
            var cart = await _cartRepo.FindCartByUserId(item.UserId);
            cartItem.CartId = cart.Id;
            
            var result = await _cartItemRepo.AddToCart(cartItem);

            return result;
        }

        public async Task<bool> DeleteCartItem(Guid itemId)
        {
            var result = await _cartItemRepo.DeleteAsync(itemId);

            return result;
        }

        public async Task<IEnumerable<CartItemForListDTO>> GetByUserId(Guid userId)
        {
            var items = await _cartItemRepo.GetByUserId(userId);
            var result = _mapper.Map<IEnumerable<CartItemForListDTO>>(items);

            if (result.Count() > 0)
            {
                return result;
            }

            return null;
        }
    }
}