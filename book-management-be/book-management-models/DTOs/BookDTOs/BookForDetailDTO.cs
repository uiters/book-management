using System.Collections.Generic;

namespace book_management_models.DTOs.BookDTOs
{
    public class BookForDetailDTO
    {
        public BookForListDTO Book { get; set; }
        public List<BookForListDTO> RelatedBooks { get; set; }
    }
}