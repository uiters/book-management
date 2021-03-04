using System.Threading.Tasks;
using book_management_models;

namespace book_management_services.Services
{
    public interface ICartService
    {
        Task<bool> AddCart(Cart cart);
    }
}