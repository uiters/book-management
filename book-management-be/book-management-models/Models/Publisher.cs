using System.Collections.Generic;

namespace book_management_models
{
    public class Publisher : BaseModel
    {
        public string Name { get; set; }
        public ICollection<Book> PublishedBooks { get; set; }
    }
}