using book_management_models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace book_management_services.Services
{
    public interface IPublisherService
    {
        IEnumerable<Publisher> GetAllPublisher();
        void Add(Publisher publisher);
        void Update(Publisher publisher);
        void Delete(Guid id);
        IEnumerable<Publisher> GetAll();
        //IEnumerable<Category> GetAllPaging(int page, int pageSize, out int totalRow);
        Publisher GetById(Guid id);
        void SaveChanges();

        IEnumerable<Publisher> GetAllPublisherByName(string szName);

        IEnumerable<Publisher> GetAllPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize);

        IEnumerable<Publisher> GetForListParams();
    }
}
