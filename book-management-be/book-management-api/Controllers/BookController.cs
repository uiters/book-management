using System.Collections.Generic;
using System.Net;
using AutoMapper;
using book_management_helpers.CustomException;
using book_management_models.DTOs.BookDTOs;
using book_management_services.Services;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [ApiController]
    [Route("/api/book/")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IMapper _mapper;

        public BookController(IBookService bookService, IMapper mapper)
        {
            this._bookService = bookService;
            this._mapper = mapper;
        }

        [HttpGet("all")]
        public IActionResult GetListBooks()
        {
            var listBooks = _bookService.GetListBooks();
            var result = _mapper.Map<List<BookForListDTO>>(listBooks);

            if (result.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find book in database!");
            }

            return Ok(result);
        }

        [HttpGet("category")]
        public IActionResult GetBooksByCategory([FromQuery] string categoryName)
        {
            var listBooksByCategory = _bookService.GetBooksByCategory(categoryName);
            var result = _mapper.Map<List<BookForListDTO>>(listBooksByCategory);
            
            if (result.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find book with given category in database!");
            }

            return Ok(result);
        }
    }
}