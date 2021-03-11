using book_management_models;
using System.Collections.Generic;

namespace book_management_persistence.Repositories
{
    public interface IUserRepository
    {
        //Author GetAuthorByName(string authorName);

        //public bool CheckExistAuthorByName(string name);
        //public IEnumerable<Author> GetAllAuthorByName(string szName);
        public IEnumerable<User> GetAllUserPaging(out int totalRow, string searchKey, string searchTitle, int page, int pageSize, string[] include = null);

    }
}