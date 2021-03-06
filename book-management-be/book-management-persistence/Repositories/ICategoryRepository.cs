using book_management_models;
using System;
using System.Collections.Generic;

namespace book_management_persistence.Repositories
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        public bool CheckExistCategoryByName(string name);
        public IEnumerable<Category> GetCategoryByName(string szName);

        public Category findCategory(Guid id);

        public IEnumerable<Category> GetAllCategoryPaging(out int totalRow, string searchTitle, int page, int pageSize, string[] include = null);
    }
}