using System;

namespace book_management_models
{
    public class Photo : BaseModel
    {
        public Guid BookId { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public string Description { get; set; }
    }
}