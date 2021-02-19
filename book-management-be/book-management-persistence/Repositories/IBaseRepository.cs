using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;

namespace book_management_persistence.Repositories
{
    public interface IBaseRepository<T> where T : BaseModel
    {
        IEnumerable<T> GetList();
        Task<bool> InsertAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> DeleteAsync(Guid id);
        Task<T> GetByIdAsync(Guid id);
        Task<bool> SaveAll();
    }
}