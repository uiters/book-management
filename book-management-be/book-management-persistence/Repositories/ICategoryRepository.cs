using book_management_models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace book_management_persistence.Repositories
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        public bool CheckExistCategoryByName(string name);
        public IEnumerable<Category> GetCategoryByName(string szName);
        Task<IEnumerable<Category>> GetCategoryForMain();
        public Category FindCategory(Guid id);

        public IEnumerable<Category> GetAllCategoryPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize, string[] include = null);
        Task<IEnumerable<Category>> GetCategoryForSelect();
    }
}