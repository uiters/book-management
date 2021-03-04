using System.Threading.Tasks;
using book_management_models;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;

namespace book_management_services.Implements
{
    public class CartServiceImpl : ICartService
    {
        private IUnitOfWorks _unitOfWorks;
        private CartRepositoryImpl _cartRepo;

        public CartServiceImpl(IUnitOfWorks unitOfWorks)
        {
            this._unitOfWorks = unitOfWorks;
            this._cartRepo = this._unitOfWorks.CartRepository();
        }

        public async Task<bool> AddCart(Cart cart)
        {
            var result = await _cartRepo.AddCart(cart);
            await _unitOfWorks.SaveAsync();

            return result;
        }
    }
}