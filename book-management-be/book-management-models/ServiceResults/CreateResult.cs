using System;

namespace book_management_models.ServiceResults
{
    public class CreateResult
    {
        public string ResultMessage { get; set; }
        public bool Result { get; set; }
        public Guid NewOrderId { get; set; }
    }
}