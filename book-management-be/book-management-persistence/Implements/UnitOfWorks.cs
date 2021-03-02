using System;
using System.Threading.Tasks;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;

namespace book_management_persistence.Implements
{
    public class UnitOfWorks : IUnitOfWorks, IDisposable
    {
        public AppDbContext DbContext { get; set; }
        public BookRepositoryImpl BookRepositoryImpl { get; set; }
        public CategoryRepositoryImpl CategoryRepositoryImpl { get; set; }
        public AuthorRepositoryImpl AuthorRepositoryImpl { get; set; }
        public PublisherRepositoryImpl PublisherRepositoryImpl { get; set; }
        public PhotoRepositoryImpl PhotoRepositoryImpl { get; set; }
        private bool _disposed = false;

        public UnitOfWorks(AppDbContext context)
        {
            this.DbContext = context;
        }

        public async Task<bool> SaveAsync()
        {
            if (await DbContext.SaveChangesAsync() > 0)
            {
                return true;
            }

            return false;
        }

        public BookRepositoryImpl BookRepository()
        {
            if (this.BookRepositoryImpl == null)
            {
                this.BookRepositoryImpl = new BookRepositoryImpl(DbContext);
            }

            return this.BookRepositoryImpl;
        }

        public CategoryRepositoryImpl CategoryRepository()
        {
            if (this.CategoryRepositoryImpl == null)
            {
                this.CategoryRepositoryImpl = new CategoryRepositoryImpl(DbContext);
            }

            return this.CategoryRepositoryImpl;
        }

        public void Commit()
        {
            DbContext.SaveChanges();
        }

        public AuthorRepositoryImpl AuthorRepository()
        {
            if (this.AuthorRepositoryImpl == null)
            {
                this.AuthorRepositoryImpl = new AuthorRepositoryImpl(DbContext);
            }

            return this.AuthorRepositoryImpl;
        }

        public PublisherRepositoryImpl PublisherRepository()
        {
            if (this.PublisherRepositoryImpl == null)
            {
                this.PublisherRepositoryImpl = new PublisherRepositoryImpl(DbContext);
            }

            return this.PublisherRepositoryImpl;
        }

        public PhotoRepositoryImpl PhotoRepository()
        {
            if (this.PhotoRepositoryImpl == null)
            {
                this.PhotoRepositoryImpl = new PhotoRepositoryImpl(DbContext);
                return this.PhotoRepositoryImpl;
            }

            return this.PhotoRepositoryImpl;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    DbContext.Dispose();
                }
            }

            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}