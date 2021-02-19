using System;

namespace book_management_models.DTOs.Response
{
    public class MyErrorResponse
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }

        public MyErrorResponse(Exception ex)
        {
            Type = ex.GetType().Name;
            Message = ex.Message;
            // StackTrace = ex.ToString();
        }
    }
}