using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace book_management_persistence.Implements
{
    public class BaseRepositoryImpl<T> : IBaseRepository<T> where T :BaseModel
    {
        protected AppDbContext Context;
        protected DbSet<T> DbSet;

        public BaseRepositoryImpl(AppDbContext context)
        {
            this.Context = context;
            this.DbSet = context.Set<T>();
        }
        
        public IEnumerable<T> GetList()
        {
            var list = DbSet.AsAsyncEnumerable();
            return (IEnumerable<T>) list;
        }

        public async Task<bool> InsertAsync(T entity)
        {
            if (entity == null)
            {
                return false;
            }

            await Context.AddAsync(entity);
            return await Context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(T entity)
        {
            if (entity == null)
            {
                return false;
            }

            Context.Update(entity);
            return await Context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await DbSet.SingleOrDefaultAsync(e => e.Id.Equals(id));
            if (entity == null)
            {
                return false;
            }

            var result = Context.Remove(entity);
            return await Context.SaveChangesAsync() > 0;
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            var entity = await DbSet.SingleOrDefaultAsync(e => e.Id.Equals(id));

            return entity ?? null;
        }

        public async Task<bool> SaveAll()
        {
            return await Context.SaveChangesAsync() > 0;
        }


        public IEnumerable<T> QueryAll()
        {
            return Context.Set<T>().AsQueryable();
        }

        public void Add(T entity)
        {
            DbSet.Add(entity);
        }

        public void Update(T entity)
        {
            DbSet.Update(entity);
        }

        public void UpdateMany(IEnumerable<T> entity)
        {
            DbSet.UpdateRange(entity);
        }

        public void Delete(T entity)
        {
            DbSet.Remove(entity);
        }

        public void SaveChange()
        {
            Context.SaveChanges();
        }

        public void Remove(T entity)
        {
            DbSet.Remove(entity);
        }

        public virtual T GetById(object id)
        {
            return DbSet.Find(id);
        }

        public virtual IEnumerable<T> GetMultiPaging(/*out int total,string searchTitle,*/ int index = 0, int size = 20, string[] includes = null)
        {
            int skipCount = index * size;
            IQueryable<T> _resetSet;

            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = Context.Set<T>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                _resetSet = query.AsQueryable();
            }
            else
            {
                _resetSet = Context.Set<T>().AsQueryable();
            }

            _resetSet = skipCount == 0 ? _resetSet.Take(size) : _resetSet.Skip(skipCount).Take(size);
            
            //total = _resetSet.Count();
            return _resetSet.AsQueryable();
        }
    }
}