using System.Collections.Generic;

namespace book_management_models
{
    public class Category : BaseModel
    {
        public string Name { get; set; }
        public string Details { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}