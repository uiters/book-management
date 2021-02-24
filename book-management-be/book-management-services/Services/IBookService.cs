using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;
using book_management_models.DTOs.BookDTOs;

namespace book_management_services.Services
{
    public interface IBookService
    {
        IEnumerable<Book> GetListBooks();
        IEnumerable<Book> GetBooksByCategory(string categoryName);
        Book GetBookById(Guid id);
        Task<bool> AddNewBook(BookForCreateDTO newBook);
        Task<bool> UpdateBook(Book bookForUpdate);
        Task<bool> DeleteBook(Guid bookId);
    }
}