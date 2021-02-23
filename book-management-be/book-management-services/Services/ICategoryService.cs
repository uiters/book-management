using System.Collections.Generic;
using book_management_models;

namespace book_management_services.Services
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetAllCategory();
    }
}