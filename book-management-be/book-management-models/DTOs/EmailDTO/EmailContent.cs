namespace book_management_models.DTOs.EmailDTO
{
    public class EmailContent
    {
        public string ToName { get; set; }
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; } 
    }
}