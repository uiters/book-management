using book_management_models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace book_management_services.Services
{
    public interface IAuthorService
    {
        IEnumerable<Author> GetAllAuthor();
        void Add(Author publisher);
        void Update(Author publisher);
        void Delete(Guid id);
        IEnumerable<Author> GetAll();
        //IEnumerable<Category> GetAllPaging(int page, int pageSize, out int totalRow);
        Author GetById(Guid id);
        void SaveChanges();

        IEnumerable<Author> GetAllAuthorByName(string szName);

        IEnumerable<Author> GetAllPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize);

        IEnumerable<Author> GetForListParams();

    }
}
