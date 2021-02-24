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
    }
}