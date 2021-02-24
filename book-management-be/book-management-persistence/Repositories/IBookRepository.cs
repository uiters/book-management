using System;
using System.Collections.Generic;
using book_management_models;

namespace book_management_persistence.Repositories
{
    public interface IBookRepository : IBaseRepository<Book>
    {
        IEnumerable<Book> GetBooksByCategory(string catergory);
        Book GetBookById(Guid id);
        IEnumerable<Book> GetAllBook();
    }
}