using System;
using System.Collections.Generic;
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
    }
}