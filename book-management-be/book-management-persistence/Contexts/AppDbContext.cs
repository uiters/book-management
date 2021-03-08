using book_management_models;
using Microsoft.EntityFrameworkCore;

namespace book_management_persistence.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Author> Authors { get; set; }
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<CartItem> CartItems { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Publisher> Publishers { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public DbSet<Photo> Images { get; set; }
        public virtual DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Author>().ToTable("Authors");
            builder.Entity<Book>().ToTable("Books");
            builder.Entity<Cart>().ToTable("Carts");
            builder.Entity<CartItem>().ToTable("CartItems");
            builder.Entity<Category>().ToTable("Categories");
            builder.Entity<Publisher>().ToTable("Publishers");
            builder.Entity<Review>().ToTable("Reviews");
            builder.Entity<Tag>().ToTable("Tags");
            builder.Entity<User>().ToTable("Users");
            builder.Entity<Photo>().ToTable("Images");
            builder.Entity<Order>().ToTable("Orders");

            builder.Entity<User>()
                .HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .HasForeignKey<Cart>(c => c.UserId);
        }
    }
}