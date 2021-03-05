using book_management_models;
using System;
using System.Collections.Generic;

namespace book_management_persistence.Repositories
{
    public interface IPublisherRepository
    {
        Publisher GetPublisherByName(string publisherName);

        public bool CheckExistPublisherByName(string name);
        public IEnumerable<Publisher> GetAllPublisherByName(string szName);

        public Publisher findPublisher(Guid id);
    }
}