using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using book_management_models;
using book_management_models.DTOs.BookDTOs;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;

namespace book_management_services.Implements
{
    public class BookServiceImpl : IBookService
    {
        private readonly IUnitOfWorks _unitOfWorks;
        private readonly BookRepositoryImpl _bookRepository;
        private readonly AuthorRepositoryImpl _authorRepository;
        private readonly PublisherRepositoryImpl _publisherRepository;
        private readonly IMapper _mapper;


        public BookServiceImpl(IUnitOfWorks unitOfWork, IMapper mapper)
        {
            this._unitOfWorks = unitOfWork;
            this._bookRepository = this._unitOfWorks.BookRepository();
            this._authorRepository = this._unitOfWorks.AuthorRepository();
            this._publisherRepository = this._unitOfWorks.PublisherRepository();
            this._mapper = mapper;
        }

        public IEnumerable<Book> GetListBooks()
        {
            var result = this._bookRepository.GetAllBook();

            return result;
        }

        public IEnumerable<Book> GetBooksByCategory(string categoryName)
        {
            var result = this._bookRepository.GetBooksByCategory(categoryName);

            return result;
        }

        public Book GetBookById(Guid id)
        {
            var result = _bookRepository.GetBookById(id);

            return result;
        }

        public async Task<bool> AddNewBook(BookForCreateDTO newBook)
        {
            var author = _authorRepository.GetAuthorByName(newBook.AuthorName);
            var publisher = _publisherRepository.GetPublisherByName(newBook.PublisherName);

            if (author != null && publisher != null)
            {
                var book = _mapper.Map<Book>(newBook);
                book.AuthorId = author.Id;
                book.PublisherId = publisher.Id;

                var result = await _bookRepository.InsertAsync(book);
                return result;
            }

            return false;
        }


        public Task<bool> UpdateBook(Book bookForUpdate)
        {
            var result = _bookRepository.UpdateAsync(bookForUpdate);

            return result;
        }

        public Task<bool> DeleteBook(Guid bookId)
        {
            var result = _bookRepository.DeleteAsync(bookId);

            return result;
        }
    }
}