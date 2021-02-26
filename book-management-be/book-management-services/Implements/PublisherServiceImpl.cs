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
    public class PublisherServiceImpl : IPublisherService
    {
        private readonly IUnitOfWorks _unitOfWorks;
        private readonly PublisherRepositoryImpl _publisherRepository;

        public PublisherServiceImpl(IUnitOfWorks unitOfWorks)
        {
            this._unitOfWorks = unitOfWorks;
            this._publisherRepository = this._unitOfWorks.PublisherRepository();
        }

        public IEnumerable<Publisher> GetAllPublisher()
        {
            var listPublisher = _publisherRepository.GetList();
            return listPublisher;
        }

        public void Add(Publisher publisher)
        {
            // validation
            if (string.IsNullOrEmpty(publisher.Name))
            {
                throw new AppException("Name of Category is invalid");
            }

            if (_publisherRepository.CheckExistPublisherByName(publisher.Name) == true)
            {
                throw new AppException("Category is Exist");
            }
            _publisherRepository.Add(publisher);
        }

        public void Update(Publisher publisherParam)
        {
            var publisher = _publisherRepository.GetById(publisherParam.Id);

            if (publisher == null)
                throw new AppException("Publisher not found");

            _publisherRepository.Update(publisher);
        }

        public void Delete(Guid id)
        {
            var publisher = _publisherRepository.GetById(id);

            if (publisher == null)
                throw new AppException("Publisher not found");

            _publisherRepository.Remove(publisher);
        }

        public IEnumerable<Publisher> GetAll()
        {
            return _publisherRepository.QueryAll();
        }

        //public IEnumerable<Category> GetAllPaging(int page, int pageSize, out int totalRow)
        //{
        //    return _categoryRepository.GetMultiPaging(x => x.Status, out totalRow, page, pageSize, new string[] { "Khach", "LoaiHopDong" });
        //}

        public Publisher GetById(Guid id)
        {
            return _publisherRepository.GetById(id);
        }

        public void SaveChanges()
        {
            _unitOfWorks.Commit();
        }

        public IEnumerable<Publisher> GetAllPublisherByName(string szName)
        {
            return _publisherRepository.GetAllPublisherByName(szName);
        }
    }
}
