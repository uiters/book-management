using System.Collections.Generic;
using book_management_models.DTOs.AuthorDTOs;
using book_management_models.DTOs.CategoryDTOs;
using book_management_models.DTOs.PublisherDTOs;

namespace book_management_models.DTOs.FormDataDTOs
{
    public class NewBookFormData
    {
        public IEnumerable<AuthorForListDTO> Authors { get; set; }
        public IEnumerable<PublisherForListDTO> Publishers { get; set; }
        public IEnumerable<CategoryForListDTO> Categories { get; set; }
    }
}