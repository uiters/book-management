using book_management_helpers.Configurations;
using book_management_models;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace book_management_services.Implements
{
    public class AuthorServiceImpl : IAuthorService
    {
        private readonly IUnitOfWorks _unitOfWorks;
        private readonly AuthorRepositoryImpl _authorRepository;

        public AuthorServiceImpl(IUnitOfWorks unitOfWorks)
        {
            this._unitOfWorks = unitOfWorks;
            this._authorRepository = this._unitOfWorks.AuthorRepository();
        }

        public IEnumerable<Author> GetAllAuthor()
        {
            var listAuthor = _authorRepository.GetList();
            return listAuthor;
        }

        public void Add(Author author)
        {
            // validation
            if (string.IsNullOrEmpty(author.Name))
            {
                throw new AppException("Name of Author is invalid");
            }

            if (_authorRepository.CheckExistAuthorByName(author.Name) == true)
            {
                throw new AppException("Author is Exist");
            }
            _authorRepository.Add(author);
        }

        public void Update(Author authorParam)
        {
            var author = _authorRepository.GetById(authorParam.Id);

            if (author == null)
                throw new AppException("Author not found");

            author.Name = authorParam.Name;
            author.Description = authorParam.Description;

            _authorRepository.Update(author);
        }

        public void Delete(Guid id)
        {
            var author = _authorRepository.GetById(id);

            if (author == null)
                throw new AppException("Author not found");

            _authorRepository.Remove(author);
        }

        public IEnumerable<Author> GetAll()
        {
            return _authorRepository.QueryAll();
        }

        //public IEnumerable<Category> GetAllPaging(int page, int pageSize, out int totalRow)
        //{
        //    return _categoryRepository.GetMultiPaging(x => x.Status, out totalRow, page, pageSize, new string[] { "Khach", "LoaiHopDong" });
        //}

        public Author GetById(Guid id)
        {
            return _authorRepository.GetById(id);
        }

        public void SaveChanges()
        {
            _unitOfWorks.Commit();
        }

        public IEnumerable<Author> GetAllAuthorByName(string szName)
        {
            return _authorRepository.GetAllAuthorByName(szName);
        }

        public IEnumerable<Author> GetAllPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize)
        {
            var lst = _authorRepository.GetAllAuthorPaging(out totalRow, searchKey, searchTitle, page, pageSize);

            return lst;

        }
    }
}
