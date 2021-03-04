using System;
using System.Collections.Generic;
using book_management_helpers.Configurations;
using book_management_models;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;

namespace book_management_services.Implements
{
    public class CategoryServiceImpl : ICategoryService
    {
        private readonly IUnitOfWorks _unitOfWorks;
        private readonly CategoryRepositoryImpl _categoryRepository;

        public CategoryServiceImpl(IUnitOfWorks unitOfWorks)
        {
            this._unitOfWorks = unitOfWorks;
            this._categoryRepository = this._unitOfWorks.CategoryRepository();
        }

        public IEnumerable<Category> GetAllCategory()
        {
            var listCategory = _categoryRepository.GetList();
            return listCategory;
        }

        public void Add(Category category)
        {
            // validation
            if (string.IsNullOrEmpty(category.Name))
            {
                throw new AppException("Name of Category is invalid");
            }

            if (_categoryRepository.CheckExistCategoryByName(category.Name) == true)
            {
                throw new AppException("Category is Exist");
            }
            _categoryRepository.Add(category);
        }

        public void Update(Category categoryParam)
        {
            var category = _categoryRepository.GetById(categoryParam.Id);

            if (category == null)
                throw new AppException("Category not found");

            category.Name = categoryParam.Name;
            category.Details = categoryParam.Details;

            _categoryRepository.Update(category);
        }

        public void Delete(Guid id)
        {
            var category = _categoryRepository.GetById(id);

            if (category == null)
                throw new AppException("Category not found");

            _categoryRepository.Remove(category);
        }

        public IEnumerable<Category> GetAll()
        {
            return _categoryRepository.QueryAll();
        }

        //public IEnumerable<Category> GetAllPaging(int page, int pageSize, out int totalRow)
        //{
        //    return _categoryRepository.GetMultiPaging(x => x.Status, out totalRow, page, pageSize, new string[] { "Khach", "LoaiHopDong" });
        //}

        public Category GetById(Guid id)
        {
            return _categoryRepository.GetById(id);
        }

        public void SaveChanges()
        {
            _unitOfWorks.Commit();
        }

        public IEnumerable<Category> GetCategoryByName(string szName)
        {
            return _categoryRepository.GetCategoryByName(szName);
        }

        public IEnumerable<Category> GetAllPaging(/*string searchTitle,*/ int page, int pageSize/*, out int totalRow*/)
        {
            return _categoryRepository.GetMultiPaging(/*out totalRow,searchTitle,*/ page, pageSize);
        }
    }
}