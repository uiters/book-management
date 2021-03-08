using System;
using System.Net;

namespace book_management_helpers.CustomException
{
    public class NullResultException : Exception
    {
        public HttpStatusCode Status { get; private set; }

        public NullResultException(HttpStatusCode status, string msg) : base(msg)
        {
            Status = status;
        }
    }
}