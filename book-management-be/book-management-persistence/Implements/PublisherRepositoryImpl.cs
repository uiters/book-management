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

        public IEnumerable<Publisher> GetAllPublisherPaging(out int totalRow, int searchKey, string searchTitle, int page, int pageSize, string[] includes = null)
        {
            page = page - 1;

            int skipCount = page * pageSize;

            IQueryable<Publisher> _resetSet;

            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = Context.Publishers.Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                _resetSet = query.AsQueryable();
            }
            else
            {
                _resetSet = Context.Publishers.AsQueryable();
            }

            if (searchTitle != null)
            {
                searchTitle = searchTitle.Trim();
                if (searchKey == 1)
                    _resetSet = _resetSet.Where(x => x.Name.Contains(searchTitle));
                
            }

            var a = _resetSet.ToList();
            totalRow = _resetSet.Count();

            _resetSet = skipCount == 0 ? _resetSet.Take(pageSize) : _resetSet.Skip(skipCount).Take(pageSize);

            return _resetSet.AsQueryable();
        }

        public IEnumerable<Publisher> GetForListParams()
        {
            var lst = Context.Publishers.Where(x => x.PublishedBooks.Any());
            lst = lst.Take(5);
            var a = lst.ToList();
            return lst;
            
        }
    }
}