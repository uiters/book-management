//@ts-ignore
import { Pagination } from "@material-ui/lab";
//@ts-ignore
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PATHS } from "../../constants/paths";
import bookApi from "../../services/api/bookApi";
import { toastError, toastSuccess } from "../../services/toastService";
import BookModel from "../../types/models/BookModel";
import Book from "../Home/components/Book";
import srcSearch from "../../assets/loupe.png";

const BookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchKey, setSearchKey] = useState(1);
  const countPerPage = 12;

  const getBookPage = () => {
    bookApi
      .getPagedBook(searchKey, searchTitle, page, countPerPage)
      .then((response) => {
        console.log(response);
        setBooks(response.data.items);
        setTotalPage(response.data.totalPage);
        setTotalCount(response.data.totalCount);
        console.log(searchKey);
      })
      .catch((error) => {
        toastError(error.response.data.message);
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
          .deleteBook(id)
          .then((response) => {
            toastSuccess("Delete successful book with id: " + id);
            const removedList = books.filter(
              (book: BookModel) => book.id !== id
            );
            setBooks(removedList);
          })
          .catch((error) => {
            console.log(error);
            toastError("Selected book is in cart!");
          });
      }
    });
  };

  useEffect(() => {
    getBookPage();
  }, [page, searchTitle, searchKey]);

  const handlePageChange = (event: any, value: number) => {
    console.log(value);
    setPage(value);
  };

  const hitButtonSearch = () => {
    setPage(1);
    setSearchTitle(searchTitle);
    setSearchKey(searchKey);
  };

  const onChangeValueInputSearch = (e: any) => {
    setPage(1);
    setSearchTitle(e.target.value);
  };

  const listBooks = books.map((book: BookModel) => {
    return (
      <div className="w-1/5 bg-white mt-3 ml-2" key={book.id}>
        <Book
          id={book.id}
          imageSrc={book.thumbnailUrl}
          title={book.title}
          author={book.author.name}
        ></Book>
        <div className="space-x-3 mb-3">
          <button className="rounded-xl bg-blue-400 p-3 focus:outline-none">
            <a href={"/book/update/" + book.id} className="p-3">
              Update
            </a>
          </button>
          <button
            className="rounded-xl bg-red-400 p-3 focus:outline-none"
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
      <div className="container flex flex-col items-center">
        <button className="rounded bg-blue-400 p-3 mt-6">
          <a href={PATHS.BOOK_NEW} className="p-4">
            New Book
          </a>
        </button>
        <div>
          <div
            className="mt-7 mb-3 ml-56 mr-28 flex gap-x-12"
            style={{ justifyContent: "between" }}
          >
            <div className="select mr-2 border-2 border-gray-200 float-right w-1/5">
              <select
                value={searchKey}
                onChange={(e) => setSearchKey(e.currentTarget.value)}
                className="p-2 rounded-xl"
              >
                <option value="1">Search by Name</option>
                <option value="2">Search by Category</option>
                <option value="3">Search by Author</option>
                <option value="4">Search by Publisher</option>
              </select>
            </div>
            <div className="field mr-2 w-3/5">
              <div className="control">
                <input
                  type="text"
                  className="input  border-2 border-gray-200 rounded-xl p-2 float-left w-full"
                  placeholder="Search Category..."
                  value={searchTitle}
                  onChange={(e) => {
                    onChangeValueInputSearch(e);
                  }}
                />
              </div>
            </div>
            <button
              onClick={hitButtonSearch}
              className="button is-link border-2 border-gray-200 text-base bg-blue-400 text-white p-2 rounded-xl w-40 hover:bg-blue-600"
            >
              Search
            </button>
          </div>
          {searchTitle && (
            <h2 className="mb-6 has-text-centered is-size-2">
              Search results for: "{searchTitle}"
            </h2>
          )}
        </div>

        {totalCount == 0 && <div>Don't have data to Show</div>}

        {totalCount > 0 && (
          <div className="flex flex-wrap space-y-3">{listBooks}</div>
        )}

        <div className="flex w-full float-right">
          <nav className="flex float-right gap-x-3 w-full p-3 justify-center">
            <Pagination
              className="my-3"
              count={totalPage}
              page={page}
              siblingCount={1}
              boundaryCount={2}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
