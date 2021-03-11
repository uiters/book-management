using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;

namespace book_management_persistence.Repositories
{
    public interface IBookRepository : IBaseRepository<Book>
    {
        IEnumerable<Book> GetBooksByCategory(string catergory);
        Book GetBookById(Guid id);
        IEnumerable<Book> GetAllBook();
        bool IsBookExisted(string title);
        public IEnumerable<Book> GetAllBookPaging(out int totalRow, int searchKey, string searchTitle, int page = 1, int pageSize = 10, string[] include = null);
        Task<bool> UpdateBook(Book book, Guid id);
    }
}