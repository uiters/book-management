using System.Threading.Tasks;
using book_management_models;
using book_management_models.DTOs.EmailDTO;
using book_management_services.Services;
using MailKit;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [ApiController]
    [Route("/api/mail/")]
    public class MailController : ControllerBase
    {
        private IEmailService _mailService;

        public MailController(IEmailService mailService)
        {
            this._mailService = mailService;
        }

        [HttpPost("")]
        public async Task<IActionResult> SendMail([FromBody] EmailContent mailContent)
        {
            if (_mailService != null) await _mailService?.SendEmailAsync(mailContent, new Order());

            return Ok("result");
        }
        
    }
}