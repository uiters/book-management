using book_management_models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace book_management_services.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(Guid id);
        Task<User> CreateAsync(User user, string password);
        void Update(User user, string password = null);
        void Delete(Guid id);

        IEnumerable<User> GetAllPaging(out int totalRow, string searchKey, string searchTitle, int page, int pageSize);
    }
}
