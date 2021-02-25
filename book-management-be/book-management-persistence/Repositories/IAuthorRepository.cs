using book_management_models;
using System.Collections.Generic;

namespace book_management_persistence.Repositories
{
    public interface IAuthorRepository
    {
        Author GetAuthorByName(string authorName);

        public bool CheckExistAuthorByName(string name);
        public IEnumerable<Author> GetAllAuthorByName(string szName);
    }
}