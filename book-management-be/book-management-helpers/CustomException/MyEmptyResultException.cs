using System;
using System.Net;

namespace book_management_helpers.CustomException
{
    public class MyEmptyResultException : Exception
    {
        public HttpStatusCode Status { get; private set; }

        public MyEmptyResultException(HttpStatusCode status, string msg) : base(msg)
        {
            Status = status;
        }
    }
}