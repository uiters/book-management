using System;
using System.Collections.Generic;
using System.Linq;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace book_management_persistence.Implements
{
    public class BookRepositoryImpl : BaseRepositoryImpl<Book>, IBookRepository
    {
        public BookRepositoryImpl(AppDbContext context) : base(context)
        {
        }

        public IEnumerable<Book> GetBooksByCategory(string categoryName)
        {
            var listBooks = this.Context.Books.Include(b => b.Categories.Where(c => c.Name.Equals(categoryName)))
                .Include(b => b.Author)
                .Include(b => b.Publisher)
                .ToList();

            listBooks = listBooks.Where(b => b.Categories.Count > 0).ToList();

            return listBooks;
        }

        public Book GetBookById(Guid id)
        {
            var book = DbSet.Where(b => b.Id.Equals(id)).Include(b => b.Author)
                .Include(b => b.Publisher)
                .Include(b => b.Categories)
                .Include(b => b.Photos)
                .FirstOrDefault();

            return book;
        }

        public IEnumerable<Book> GetAllBook()
        {
            var books = DbSet.Include(b => b.Author)
                .Include(b => b.Publisher)
                .ToList();
                
            return books;
        }

        public bool IsBookExisted(string title)
        {
            var result = DbSet.Any(b => b.Title.Equals(title));
            return result;
        }
    }
}