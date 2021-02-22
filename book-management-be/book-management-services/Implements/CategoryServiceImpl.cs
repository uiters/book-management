using System.Collections.Generic;
using book_management_models;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;

namespace book_management_services.Implements
{
    public class CategoryServiceImpl : ICategoryService
    {
        private readonly IUnitOfWorks _unitOfWorks;
        private readonly CategoryRepositoryImpl _categoryRepo;

        public CategoryServiceImpl(IUnitOfWorks unitOfWorks)
        {
            IUnitOfWorks unitOfWorks1;
            this._unitOfWorks = unitOfWorks;
            this._categoryRepo = this._unitOfWorks.CategoryRepository();
        }

        public IEnumerable<Category> GetAllCategory()
        {
            var listCategory = _categoryRepo.GetList();
            return listCategory;
        }
    }
}