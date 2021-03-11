using System.Threading.Tasks;
using book_management_models;
using book_management_models.DTOs.EmailDTO;

namespace book_management_services.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailContent emailContent, Order order);
    }
}