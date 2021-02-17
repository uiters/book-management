using System.Collections.Generic;

namespace book_management_models
{
    public class Tag : BaseModel
    {
        public string TagName { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}