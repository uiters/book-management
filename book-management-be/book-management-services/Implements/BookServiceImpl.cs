using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using book_management_models;
using book_management_models.DTOs.AuthorDTOs;
using book_management_models.DTOs.BookDTOs;
using book_management_models.DTOs.CategoryDTOs;
using book_management_models.DTOs.FormDataDTOs;
using book_management_models.DTOs.PublisherDTOs;
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
        private IPhotoService _photoService;
        private CartItemRepositoryImpl _cartItemRepo;
        private CategoryRepositoryImpl _categoryRepo;


        public BookServiceImpl(IUnitOfWorks unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            this._unitOfWorks = unitOfWork;
            this._bookRepository = this._unitOfWorks.BookRepository();
            this._authorRepository = this._unitOfWorks.AuthorRepository();
            this._publisherRepository = this._unitOfWorks.PublisherRepository();
            this._cartItemRepo = this._unitOfWorks.CartItemRepository();
            this._categoryRepo = this._unitOfWorks.CategoryRepository();
            this._mapper = mapper;
            this._photoService = photoService;
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

        public async Task<Guid> AddNewBook(BookForCreateDTO newBook)
        {
            //validate book
            if (_bookRepository.IsBookExisted(newBook.Title))
            {
                return new Guid();
            }

            var author = _authorRepository.GetAuthorByName(newBook.AuthorName);
            var publisher = _publisherRepository.GetPublisherByName(newBook.PublisherName);
            var category = _categoryRepo.GetCategoryByName(newBook.CategoryName).ElementAt(0);

            if (author != null && publisher != null && category != null)
            {
                var book = new Book();
                book.Pages = newBook.Pages;
                book.Price = newBook.Price;
                book.Title = newBook.Title;
                book.AuthorId = author.Id;
                book.PublisherId = publisher.Id;
                book.Categories = new List<Category>();
                book.Categories.Add(category);
                book.Description = newBook.Description;
                book.SKU = newBook.SKU;

                var uploadPhotos = await _photoService.UploadPhotos(newBook.Photos);
                book.Photos = uploadPhotos.ToList();
                book.ThumbnailUrl = uploadPhotos.ToArray()[0].Url;

                // if (newBook.Photos.Any())
                // {
                //     var uploadPhotos = await _photoService.UploadPhotos(newBook.Photos);
                //     book.Photos = uploadPhotos.ToList();
                //     book.ThumbnailUrl = uploadPhotos.ToArray()[0].Url;
                // }

                var result = await _bookRepository.InsertAsync(book);
                _bookRepository.SaveChange();
                return book.Id;
            }

            return new Guid("string");
        }


        public async Task<bool> UpdateBook(BookForUpdateDto bookForUpdate, Guid bookId)
        {
            var book = _mapper.Map<Book>(bookForUpdate);
            var result = await _bookRepository.UpdateBook(book, bookId);

            return result;
        }

        public async Task<bool> DeleteBook(Guid bookId)
        {
            var cartItem = _cartItemRepo.FindByBookId(bookId);
            if (cartItem != null)
            {
                return false;
            }

            var result = await _bookRepository.DeleteAsync(bookId);

            return result;
        }

        public BookForDetailDTO GetDetailBookData(Guid bookId)
        {
            var book = _bookRepository.GetBookById(bookId);
            Category category =
                book.Categories.FirstOrDefault(c => c.Name.Equals(book.Categories.FirstOrDefault()?.Name));
            var relatedBooks = _bookRepository.GetBooksByCategory(category.Name);

            var result = new BookForDetailDTO();
            result.Book = _mapper.Map<BookForListDTO>(book);
            result.RelatedBooks = _mapper.Map<List<BookForListDTO>>(relatedBooks);

            return result;
        }

        public NewBookFormData GetFormData()
        {
            var authors = _mapper.Map<List<AuthorForListDTO>>(_authorRepository.GetList());
            var publishers = _mapper.Map<List<PublisherForListDTO>>(_publisherRepository.GetList());
            var categories = _mapper.Map<List<CategoryForListDTO>>(_categoryRepo.GetList());

            if (authors.Any() && publishers.Any() && categories.Any())
            {
                return new NewBookFormData()
                {
                    Authors = authors,
                    Publishers = publishers,
                    Categories = categories
                };
            }

            return null;
        }

        public IEnumerable<Book> GetAllPaging(out int totalRow, int searchKey, string searchTitle, int page,
            int pageSize)
        {
            var lst = _bookRepository.GetAllBookPaging(out totalRow, searchKey, searchTitle, page, pageSize,
                new string[] {"Categories", "Author", "Publisher"});

            return lst;
        }


        public IEnumerable<Book> GetAllForSearch(out int totalRow, string searchTitle, string category, string author, string publisher, int page, int pageSize)
        {
            var lst = _bookRepository.GetAllBookForSearch(out totalRow, searchTitle, category, author, publisher, page, pageSize);

            return lst;
        }
    }
}