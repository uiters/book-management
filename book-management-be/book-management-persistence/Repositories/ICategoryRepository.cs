using book_management_models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace book_management_persistence.Repositories
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        public bool CheckExistCategoryByName(string name);
        public IEnumerable<Category> GetCategoryByName(string szName);
        Task<IEnumerable<Category>> GetCategoryForMain();
    }
}