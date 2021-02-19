using System;
using System.Net;

namespace book_management_helpers.CustomException
{
    public class MyUnAuthException : Exception
    {
        public HttpStatusCode Status { get; private set; }

        public MyUnAuthException() : base()
        {
            Status = HttpStatusCode.Unauthorized;
        }
    }
}