using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using book_management_helpers.Configurations;
using book_management_models;
using book_management_models.DTOs.EmailDTO;
using book_management_services.Services;
using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace book_management_services.Implements
{
    public class EmailServiceImpl : IEmailService
    {
        private readonly SmtpClient _smtpClient;
        private IOptions<EmailConfiguration> _emailConfig;


        public EmailServiceImpl(SmtpClient smtpClient, IOptions<EmailConfiguration> emailConfig)
        {
            this._smtpClient = smtpClient;
            this._emailConfig = emailConfig;
        }

        public async Task SendEmailAsync(EmailContent emailContent, Order order)
        {
            try
            {
                var emailMessage = new MimeMessage();
                var bodyBuilder = new BodyBuilder();

                var fromName = _emailConfig.Value.FromName;
                var fromEmail = _emailConfig.Value.FromAddress;

                emailMessage.From.Add(new MailboxAddress(fromName, fromEmail));
                emailMessage.To.Add(new MailboxAddress(emailContent.ToName, emailContent.ToEmail));
                emailMessage.Subject = emailContent.Subject;
                // emailMessage.Body = new TextPart(TextFormat.Html) { Text = emailContent.Message };
                // bodyBuilder.HtmlBody = "<h1>test</h1>";


                var pathToFile =
                    "D:/source/DE_assignment/book-management-be/book-management-helpers/TemplateMail/template.html";
                using (StreamReader sourceReader = System.IO.File.OpenText(pathToFile))
                {
                    bodyBuilder.HtmlBody = await sourceReader.ReadToEndAsync();
                }

                string messageBody = string.Format(bodyBuilder.HtmlBody, order.User.Name,
                    order.User.Name, order.CreatedAt, order.TotalPrice, order.TotalPrice, order.PaymentMethod,
                    order.ShippingFee, order.ShippingFee + order.TotalPrice, order.TotalPrice,order.User.Address);
                emailMessage.Body = new TextPart(TextFormat.Html) {Text = messageBody};

                await _smtpClient.SendAsync(emailMessage).ConfigureAwait(false);
                // await _smtpClient.DisconnectAsync(true).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}