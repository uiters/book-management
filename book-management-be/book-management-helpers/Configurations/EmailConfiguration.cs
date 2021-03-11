namespace book_management_helpers.Configurations
{
    public class EmailConfiguration
    {
        public string FromName { get; set; }
        public string FromAddress { get; set; }
        public string MailServerAddress { get; set; }
        public int MailServerPort { get; set; }
        public string UserId { get; set; }
        public string UserPassword { get; set; }
    }
}