using System;
using System.Net;

namespace book_management_helpers.CustomException
{
    public class CreateFailResultException : Exception
    {
        public HttpStatusCode Status { get; private set; }

        public CreateFailResultException(HttpStatusCode status, string msg) : base(msg)
        {
            Status = status;
        }
    }
}