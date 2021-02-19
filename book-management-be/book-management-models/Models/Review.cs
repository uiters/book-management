using System;

namespace book_management_models
{
    public class Review : BaseModel
    {
        public string ReviewContent { get; set; }
        public int Rating { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid BookId { get; set; }
        public Book Book { get; set; }
    }
}