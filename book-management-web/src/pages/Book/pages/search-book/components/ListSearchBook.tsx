//@ts-ignore
import { Pagination } from "@material-ui/lab";
//@ts-ignore
import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { PATHS } from "../../constants/paths";
import bookApi from "../../../../../services/api/bookApi"; 
import { toastError, toastSuccess } from "../../../../../services/toastService";
import BookModel from "../../../../../types/models/BookModel";
import Book from "../../../../Home/components/Book";
// import srcSearch from '../../assets/loupe.png';

type QueryParam = {
  categoryPr: string;
  authorPr: string;
  publisherPr: string;
};

const ListSearchBook = (queryParams: QueryParam) => {
    const [books, setBooks] = useState<BookModel[]>([]);
  
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchKey, setSearchKey] = useState(1);
    const countPerPage = 16;
    console.log(queryParams.categoryPr);
    console.log(queryParams.authorPr);
    console.log(queryParams.publisherPr);
  
    const getBookPage = () => {
      bookApi
        .getPagedBook(searchKey, searchTitle, page, countPerPage)
        .then((response) => {
          console.log(response)
          setBooks(response.data.items)
          setTotalPage(response.data.totalPage)
          setTotalCount(response.data.totalCount)
          // console.log(searchKey)
        })
        .catch((error) => {
          toastError(error.response.data.message)
        })
    }
  
    useEffect(() => {
      getBookPage();
    }, [page, searchTitle, searchKey]);
  
    const handlePageChange = (event: any, value: number) => {
      console.log(value)
      setPage(value);
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
        </div>
      );
    });
  
    return (
      <div className="h-full w-full">
        <div className="container flex flex-col items-center">
          {totalCount == 0 &&
            <div>Don't have data to Show</div>
          }
  
          {totalCount > 0 &&
            <div className="flex flex-wrap space-y-3">{listBooks}</div>
          }
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
  
  export default ListSearchBook;