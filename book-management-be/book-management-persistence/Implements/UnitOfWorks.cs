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
        public CartRepositoryImpl CartRepositoryImpl { get; set; }
        public CartItemRepositoryImpl CartItemRepositoryImpl { get; set; }
        public OrderItemRepositoryImpl OrderItemRepositoryImpl { get; set; }
        public OrderRepositoryImpl OrderRepositoryImpl { get; set; }
        public UserRepositoryImpl UserRepositoryImpl { get; set; }

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

        public UserRepositoryImpl UserRepository()
        {
            if (this.UserRepositoryImpl == null)
            {
                this.UserRepositoryImpl = new UserRepositoryImpl(DbContext);
            }

            return this.UserRepositoryImpl;
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

        public CartRepositoryImpl CartRepository()
        {
            if (this.CartRepositoryImpl == null)
            {
                this.CartRepositoryImpl = new CartRepositoryImpl(DbContext);
                return this.CartRepositoryImpl;
            }

            return this.CartRepositoryImpl;
        }

        public CartItemRepositoryImpl CartItemRepository()
        {
            if (this.CartItemRepositoryImpl == null)
            {
                this.CartItemRepositoryImpl = new CartItemRepositoryImpl(DbContext);
                return this.CartItemRepositoryImpl;
            }

            return this.CartItemRepositoryImpl;
        }

        public OrderRepositoryImpl OrderRepository()
        {
            if (this.OrderRepositoryImpl == null)
            {
                this.OrderRepositoryImpl = new OrderRepositoryImpl(DbContext);
                return this.OrderRepositoryImpl;
            }

            return this.OrderRepositoryImpl;
        }

        OrderItemRepositoryImpl IUnitOfWorks.OrderItemRepositoryImpl()
        {
            if (this.OrderItemRepositoryImpl == null)
            {
                this.OrderItemRepositoryImpl = new OrderItemRepositoryImpl(DbContext);
                return this.OrderItemRepositoryImpl;
            }

            return this.OrderItemRepositoryImpl;
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