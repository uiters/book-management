using System.Threading.Tasks;
using book_management_models;
using book_management_persistence.Implements;

namespace book_management_persistence.Repositories
{
    public interface IUnitOfWorks
    {
        Task<bool> SaveAsync();
        BookRepositoryImpl BookRepository();
        CategoryRepositoryImpl CategoryRepository();
        AuthorRepositoryImpl AuthorRepository();
        PublisherRepositoryImpl PublisherRepository();
    }
}