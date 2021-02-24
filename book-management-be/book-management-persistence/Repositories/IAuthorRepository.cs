using book_management_models;

namespace book_management_persistence.Repositories
{
    public interface IAuthorRepository
    {
        Author GetAuthorByName(string authorName);
    }
}