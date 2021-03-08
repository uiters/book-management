//@ts-ignore
import { useState, useEffect } from 'react';
import PaginationModel from '../types/models/PaginationModel';

const usePagination = (initialState: PaginationModel) => {
  const { itemsPerPage, data, startFrom } = initialState;

  const [searching, setSearching] = useState(false);
  const [filteredData, setFilteredData] = useState(initialState.data);

  console.log(initialState.data);

  const perPage = itemsPerPage ? itemsPerPage : 10;
  const pages = Math.ceil(data.length / perPage);
  const pagination = [];
  const [currentPage, setCurrentPage] = useState(startFrom <= pages ? startFrom : 1);
  const [slicedData, setSlicedData] = useState(initialState.data);

  useEffect(() => {
    // setSlicedData([...filteredData].slice((currentPage - 1) * perPage, currentPage * perPage));
    setSlicedData(initialState.data)
    if(searching) {
      setCurrentPage(1);
      setSearching(false);
    }
    // eslint-disable-next-line
  }, [filteredData, currentPage]);

  let ellipsisLeft = false;
  let ellipsisRight = false;
  for(let i = 1; i <= pages; i++) {
    if(i === currentPage) {
      pagination.push(
        { id: i, current: true, ellipsis: false }
      );
    }else {
      if(i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1 ) {
        pagination.push(
          { id: i, current: false, ellipsis: false }
        );
      }else if( i > 1 && i < currentPage && !ellipsisLeft ) {
        pagination.push(
          { id: i, current: false, ellipsis: true }
        );
        ellipsisLeft = true;
      }else if( i < pages && i > currentPage && !ellipsisRight) {
        pagination.push(
          { id: i, current: false, ellipsis: true }
        );
        ellipsisRight = true;
      }
    }
  } 

  const changePage = (page: number, e: any) => {
    e.preventDefault();
    if(page !== currentPage) {
      setCurrentPage(page);
      setSlicedData([...filteredData].slice((page - 1) * perPage, page * perPage));
    }
  }

  const goToPrevPage = (e: any) => {
    e.preventDefault();
    setCurrentPage((prevVal: number) => prevVal - 1 === 0 ? prevVal : prevVal - 1);
    if(currentPage !== 1) {
      setSlicedData([...filteredData].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
    }
  }
  
  const goToNextPage = (e: any) => {
    e.preventDefault();
    setCurrentPage((prevVal: number) => prevVal === pages ? prevVal : prevVal + 1);
    if(currentPage !== pages) {
      setSlicedData([...filteredData].slice(currentPage * perPage, (currentPage + 1) * perPage));
    }
  }

  return {
    slicedData,
    pagination,
    prevPage: goToPrevPage,
    nextPage: goToNextPage,
    changePage,
    setFilteredData,
    setSearching
  };
}

export default usePagination;