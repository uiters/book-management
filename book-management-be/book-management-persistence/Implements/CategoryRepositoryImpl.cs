using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace book_management_persistence.Implements
{
    public class CategoryRepositoryImpl : BaseRepositoryImpl<Category>,ICategoryRepository
    {
        public CategoryRepositoryImpl(AppDbContext context) : base(context)
        {

        }

        public bool CheckExistCategoryByName(string name)
        {
            var category = this.Context.Categories.Any(x => x.Name == name);
            return category;
        }

        public IEnumerable<Category> GetCategoryByName(string szName)
        {
            var category = this.Context.Categories.Where(x => x.Name.Contains(szName)).ToList();
            return category;
        }


    }
}