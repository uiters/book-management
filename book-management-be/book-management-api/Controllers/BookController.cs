using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using book_management_helpers.CustomException;
using book_management_models;
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

        [HttpGet("{bookId}")]
        public IActionResult GetBookById(Guid bookId)
        {
            var book = _bookService.GetBookById(bookId);
            var bookForReturn = _mapper.Map<BookForListDTO>(book);

            return Ok(bookForReturn);
        }

        [HttpGet("category")]
        public IActionResult GetBooksByCategory([FromQuery] string categoryName)
        {
            var listBooksByCategory = _bookService.GetBooksByCategory(categoryName);
            var result = _mapper.Map<List<BookForListDTO>>(listBooksByCategory);

            if (result.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable,
                    "Can't find book with given category in database!");
            }

            return Ok(result);
        }

        [HttpPost("")]
        public async Task<ActionResult> AddNewBook([FromBody] BookForCreateDTO newBook)
        {
            var book = _mapper.Map<Book>(newBook);
            var result = await _bookService.AddNewBook(newBook);

            if (result)
            {
                return Ok("Create book successful!");
            }

            return BadRequest("Create new book failed.");
        }

        [HttpPut("{bookId}")]
        public IActionResult UpdateBook([FromBody] BookForUpdateDto updateBook)
        {
            var book = _mapper.Map<Book>(updateBook);
            var result = _bookService.UpdateBook(book);

            return Ok("Update successful!");
        }

        [HttpDelete("{bookId}")]
        public IActionResult DeleteBook(Guid bookId)
        {
            var result = _bookService.DeleteBook(bookId);

            return Ok("Delete successful book with id : " + bookId);
        }
    }
}