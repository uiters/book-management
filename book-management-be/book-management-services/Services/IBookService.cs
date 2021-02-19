using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;

namespace book_management_services.Services
{
    public interface IBookService
    {
        IEnumerable<Book> GetListBooks();
        IEnumerable<Book> GetBooksByCategory(string categoryName);
    }
}