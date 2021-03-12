using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public IEnumerable<Book> GetAllBookPaging(out int totalRow, int searchKey, string searchTitle, int page = 1, int pageSize = 10, string[] includes = null)
        {
            page = page - 1;

            int skipCount = page * pageSize;

            IQueryable<Book> _resetSet;

            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = Context.Books.Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                _resetSet = query.AsQueryable();
            }
            else
            {
                _resetSet = Context.Books.AsQueryable();
            }

            var a = _resetSet.ToList();

            if (searchTitle != null)
            {
                searchTitle = searchTitle.Trim();
                if (searchKey == 1)
                {
                    _resetSet = _resetSet.Where(x => x.Title.Contains(searchTitle));
                }
                else if (searchKey == 2)
                {
                    _resetSet = _resetSet.Where(x => x.Categories.Any(y => y.Name.Contains(searchTitle)));
                }
                else if (searchKey == 3)
                {
                    _resetSet = _resetSet.Where(x => x.Author.Name.Contains(searchTitle));
                }
                else
                {
                    _resetSet = _resetSet.Where(x => x.Publisher.Name.Contains(searchTitle));
                }

            }

            a = _resetSet.ToList();

            totalRow = _resetSet.Count();

            _resetSet = skipCount == 0 ? _resetSet.Take(pageSize) : _resetSet.Skip(skipCount).Take(pageSize);

            return _resetSet.AsQueryable();
        }
        public async Task<bool> UpdateBook(Book book, Guid id)
        {
            var curBook = DbSet.FirstOrDefault(b => b.Id.Equals(id));

            if (curBook == null)
            {
                return false;
            }

            curBook.Description = book.Description;
            curBook.Pages = book.Pages;
            curBook.Price = book.Price;
            curBook.Title = book.Title;
            curBook.Description = book.Description;

            return await Context.SaveChangesAsync() > 0;
        }

        public IEnumerable<Book> GetAllBookForSearch(out int totalRow, string searchTitle, string category, string author, string publisher, int page, int pageSize)
        {
            page = page - 1;

            int skipCount = page * pageSize;

            IQueryable<Book> _resetSet;

            IQueryable<Book> lstCategory;
            IQueryable<Book> lstAuthor;
            IQueryable<Book> lstPublisher;


            _resetSet = Context.Books
                            .Include(x => x.Categories)
                            .Include(y => y.Author)
                            .Include(z => z.Publisher);

            if (!string.IsNullOrEmpty(searchTitle))
            {
                searchTitle = searchTitle.Trim();
                _resetSet = _resetSet
                    .Where(x => (
                    (x.Title.Contains(searchTitle))
                    || (x.Categories.Any(y => y.Name.Contains(searchTitle)))
                    || (x.Author.Name.Contains(searchTitle))
                    || (x.Publisher.Name.Contains(searchTitle))
                    ));
            }

            


            if(!string.IsNullOrEmpty(category) || !string.IsNullOrEmpty(author) || !string.IsNullOrEmpty(publisher))
            {
                    lstCategory = _resetSet.Where(x => x.Categories.Any(y => y.Name.Contains(category)));
                    lstAuthor = _resetSet.Where(x => x.Author.Name.Contains(author));
                    lstPublisher = _resetSet.Where(x => x.Publisher.Name.Contains(publisher));

                _resetSet = lstCategory.Union(lstAuthor).Union(lstPublisher).Distinct();
            }

            totalRow = _resetSet.Count();

            _resetSet = skipCount == 0 ? _resetSet.Take(pageSize) : _resetSet.Skip(skipCount).Take(pageSize);

            return _resetSet.AsQueryable();
        }
    }
}