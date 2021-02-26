using System.Collections.Generic;
using System.Linq;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;

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
    }
}