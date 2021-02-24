using System.Linq;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;

namespace book_management_persistence.Implements
{
    public class PublisherRepositoryImpl : BaseRepositoryImpl<Publisher>, IPublisherRepository
    {
        public PublisherRepositoryImpl(AppDbContext context) : base(context)
        {
        }

        public Publisher GetPublisherByName(string publisherName)
        {
            var publisher = DbSet.FirstOrDefault(p => p.Name.Equals(publisherName));

            return publisher;
        }
    }
}