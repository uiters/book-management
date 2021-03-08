using book_management_persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace book_management_test
{
    public class BaseTest
    {
        protected BaseTest(DbContextOptions<AppDbContext> contextOptions)
        {
            ContextOptions = contextOptions;
        }

        protected DbContextOptions<AppDbContext> ContextOptions { get; }
    }
}