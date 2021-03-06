using System;
using System.Collections.Generic;
using System.Linq;

namespace book_management_models.DTOs
{
    public class PaginationSet<T>
    {
        public int Page { get; set; }

        //public string searchTitle { get; set; }

        public int Count
        {
            get
            {
                return (Items != null) ? Items.Count() : 0;
            }
        }

        public int TotalPage { get; set; }

        public int TotalCount { get; set; }

        public int MaxPage { get; set; }

        public IEnumerable<T> Items { get; set; }
    }
}