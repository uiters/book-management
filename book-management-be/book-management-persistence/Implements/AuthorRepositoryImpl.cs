using System.Collections.Generic;
using System.Linq;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace book_management_persistence.Implements
{
    public class AuthorRepositoryImpl : BaseRepositoryImpl<Author>, IAuthorRepository
    {
        public AuthorRepositoryImpl(AppDbContext context) : base(context)
        {
        }

        public Author GetAuthorByName(string authorName)
        {
            var author = DbSet.FirstOrDefault(a => a.Name.Equals(authorName));

            return author;
        }

        public bool CheckExistAuthorByName(string name)
        {
            var author = this.Context.Authors.Any(x => x.Name == name);
            return author;
        }

        public IEnumerable<Author> GetAllAuthorByName(string szName)
        {
            var author = this.Context.Authors.Where(x => x.Name.Contains(szName)).ToList();
            return author;
        }

        public IEnumerable<Author> GetAllAuthorPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize, string[] includes = null)
        {
            page = page - 1;

            int skipCount = page * pageSize;

            IQueryable<Author> _resetSet;

            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = Context.Authors.Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                _resetSet = query.AsQueryable();
            }
            else
            {
                _resetSet = Context.Authors.AsQueryable();
            }

            if (searchTitle != null)
            {
                searchTitle = searchTitle.Trim();
                if (searchKey == 1)
                    _resetSet = _resetSet.Where(x => x.Name.Contains(searchTitle));
                else
                    _resetSet = _resetSet.Where(x => x.Description.Contains(searchTitle));
            }

            var a = _resetSet.ToList();
            totalRow = _resetSet.Count();

            _resetSet = skipCount == 0 ? _resetSet.Take(pageSize) : _resetSet.Skip(skipCount).Take(pageSize);

            return _resetSet.AsQueryable();
        }

        public IEnumerable<Author> GetForListParams()
        {
            IEnumerable<Author> lst;

            lst = Context.Authors.Where(x => x.Books.Any());

            lst = lst.Take(5);

            return lst;

        }
    }
}