using System;
using System.Threading.Tasks;
using AutoMapper;
using book_management_models;
using book_management_models.DTOs.CartDTOs;
using book_management_models.DTOs.CartItemDTOs;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;

namespace book_management_services.Implements
{
    public class CartServiceImpl : ICartService
    {
        private IUnitOfWorks _unitOfWorks;
        private CartRepositoryImpl _cartRepo;
        private IMapper _mapper;

        public CartServiceImpl(IUnitOfWorks unitOfWorks, IMapper mapper)
        {
            this._unitOfWorks = unitOfWorks;
            this._cartRepo = this._unitOfWorks.CartRepository();
            this._mapper = mapper;
        }

        public async Task<bool> AddCart(Cart cart)
        {
            var result = await _cartRepo.AddCart(cart);
            await _unitOfWorks.SaveAsync();

            return result;
        }

        public CartForListDTO GetCartByUserId(Guid userId)
        {
            var result = _mapper.Map<CartForListDTO>(_cartRepo.GetCartByUserId(userId));

            return result;
        }
    }
}