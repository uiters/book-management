using System.Collections.Generic;

namespace book_management_models
{
    public class Author : BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}