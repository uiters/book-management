using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace book_management_models.DTOs.CategoryDTOs
{
    public class CategoryViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string Slug { get; set; }
    }
}
