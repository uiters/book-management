using System;
using System.Collections.Generic;
using System.Linq;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using Microsoft.EntityFrameworkCore;

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

        public bool CheckExistPublisherByName(string name)
        {
            var publisher = this.Context.Publishers.Any(x => x.Name == name);
            return publisher;
        }

        public IEnumerable<Publisher> GetAllPublisherByName(string szName)
        {
            var publisher = this.Context.Publishers.Where(x => x.Name.Contains(szName)).ToList();
            return publisher;
        }

        public Publisher findPublisher(Guid id)
        {
            var publisher = Context.Publishers.Where(c => c.Id.Equals(id)).Include(x => x.PublishedBooks).FirstOrDefault();

            return publisher;
        }
    }
}