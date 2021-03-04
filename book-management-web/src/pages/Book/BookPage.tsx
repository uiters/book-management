//@ts-ignore
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PATHS } from "../../constants/paths";
import bookApi from "../../services/api/bookApi";
import { toastError, toastSuccess } from "../../services/toastService";
import BookModel from "../../types/models/BookModel";
import Book from "../Home/components/Book";

const BookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);

  const getAllBooks = () => {
    bookApi.getAllBooks().then((response) => {
      setBooks(response.data);
    });
  };

  const deleteBook = (id: string) => {
    Swal.fire({
      title: "Are you sure to delete this book?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        bookApi
          .delelteBook(id)
          .then((response) => {
            toastSuccess("Delete successful book with id: " + id);
            const removedList = books.filter(
              (book: BookModel) => book.id !== id
            );
            setBooks(removedList);
            console.log(books);

            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    getAllBooks();
  }, [books.count]);

  const listBooks = books.map((book: BookModel) => {
    return (
      <div className="w-1/4 bg-white p-3" key={book.id}>
        <Book
          id={book.id}
          imageSrc={book.thumbnailUrl}
          title={book.title}
          author={book.author.name}
        ></Book>
        <div className="space-x-3">
          <button className="rounded-xl bg-blue-400 p-3">
            <a href={"/book/update/" + book.id}>Update</a>
          </button>
          <button
            className="rounded-xl bg-red-400 p-3"
            onClick={() => deleteBook(book.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="h-full w-full">
      <div className="container">
        <button className="rounded bg-red-400 p-3">
          <a href={PATHS.BOOK_NEW}>New Book</a>
        </button>
        <div className="flex flex-wrap space-y-3">{listBooks}</div>
      </div>
    </div>
  );
};

export default BookPage;
