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

        public IEnumerable<Book> GetAllByFilter(string searchTitle)
        {
            IEnumerable<Book> lst;
            //IEnumerable<Book> lst1;
            //IEnumerable<Book> lst2;
            //IEnumerable<Book> lst3;
            //IEnumerable<Book> lst4;

            lst = Context.Books.Include(x => x.Categories)
                    .Include(y => y.Author)
                    .Include(z => z.Publisher).ToList();

            //if (searchTitle != null)
            //{
            //    searchTitle = searchTitle.Trim();

            //    var lst1 = lst.Where(x => x.Title.Contains(searchTitle));
            //    var lst2 = lst.Where(x => x.Categories.Any(y => y.Name.Contains(searchTitle)));
            //    var lst3 = lst.Where(x => x.Author.Name.Contains(searchTitle));
            //    var lst4 = lst.Where(x => x.Publisher.Name.Contains(searchTitle));

            //    lst = lst1.Union(lst2).Union(lst3).Union(lst4).Distinct();
            //}

            //var a = lst.ToList();

            return lst;
        }
    }
}