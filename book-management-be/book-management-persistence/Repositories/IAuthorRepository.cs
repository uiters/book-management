using book_management_models;
using System.Collections.Generic;

namespace book_management_persistence.Repositories
{
    public interface IAuthorRepository
    {
        Author GetAuthorByName(string authorName);

        public bool CheckExistAuthorByName(string name);
        public IEnumerable<Author> GetAllAuthorByName(string szName);
        public IEnumerable<Author> GetAllAuthorPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize, string[] include = null);

    }
}