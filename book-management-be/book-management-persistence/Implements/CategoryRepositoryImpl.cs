using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<Category>> GetCategoryForMain()
        {
            var categories = await DbSet.Take(10).Where(c => c.Books.Count() > 0).ToListAsync();

            return categories;
        }
        
        public Category findCategory(Guid id)
        {
            var category = Context.Categories.Where(c => c.Id.Equals(id)).Include(c => c.Books).FirstOrDefault();

            return category;
        }

        public IEnumerable<Category> GetAllCategoryPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize, string[] includes = null)
        {
            page = page - 1;

            int skipCount = page * pageSize;

            IQueryable<Category> _resetSet;

            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = Context.Categories.Include(includes.First());
                foreach (var include in includes.Skip(1))
                query = query.Include(include);
                _resetSet = query.AsQueryable();
            }
            else
            {
                _resetSet = Context.Categories.AsQueryable();
            }

            if (searchTitle != null)
            {
                searchTitle = searchTitle.Trim();
                if(searchKey == 1)
                    _resetSet = _resetSet.Where(x => x.Name.Contains(searchTitle));
                else
                    _resetSet = _resetSet.Where(x => x.Details.Contains(searchTitle));
            }

            var a = _resetSet.ToList();
            totalRow = _resetSet.Count();

            _resetSet = skipCount == 0 ? _resetSet.Take(pageSize) : _resetSet.Skip(skipCount).Take(pageSize);

            return _resetSet.AsQueryable();
        }
    }
}