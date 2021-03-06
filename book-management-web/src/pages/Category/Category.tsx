//@ts-ignore
import React, { useState, useEffect, useCallback, Fragment } from "react";
//@ts-ignore
import { Link } from 'react-router-dom';
import { isConstructorTypeNode } from "typescript";
import categoryApi from '../../services/api/categoryApi';
import CategoryModel from '../../types/models/CategoryModel';
import { toastError, toastSuccess } from "../../services/toastService";
import Swal from 'sweetalert2';
//@ts-ignore
import { useHistory } from "react-router-dom";
import updateSrc from '../../assets/update-icon.png';
import deleteSrc from '../../assets/delete-icon.png';
import { Pagination } from "@material-ui/lab";

const Category = () => {

  const history = useHistory();

  const [data, setData] = useState<CategoryModel[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const countPerPage = 5;

  const getCategoryPage = () => {
    categoryApi
      .getPagedCategory(searchTitle, page, countPerPage)
      .then((response) => {
        setData(response.data.items)
        setTotalPage(response.data.totalPage)
      })
      .catch((error) => {
        toastError(error.response.data.message)
      })
  }

  useEffect(() => {
    getCategoryPage();
  }, [page, searchTitle]);

  const onDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure to delete this category?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        categoryApi
          .deleteCategory(id)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              toastSuccess("Delete  category success!");
              window.location.reload();
            }
          })
          .catch((errors) => {
            toastError("Delete  category failed");
          });
      }
    })
  };


  
  // const onSearchFieldChange = () => {
  //     if (search.trim() !== '') {
  //         setSearching(true);
  //         const copiedData = [...datas.data];
  //         const filtered = copiedData.filter(country => {
  //             let searchKey = 'name';
  //             if (datas.searchByData && datas.searchByData.length > 0) {
  //                 searchKey = searchBy;
  //             }
  //             return country[searchKey].toLowerCase().includes(search.trim().toLowerCase());
  //         });
  //         setFilteredData(filtered);
  //     } else {
  //         setFilteredData(datas.data);
  //     }
  //     setSearchFor(search);
  // }



  // useEffect(() => {
  //   // setSlicedData([...filteredData].slice((currentPage - 1) * perPage, currentPage * perPage));
  //   setSlicedData(initialState.data)
  //   if(searching) {
  //     setCurrentPage(1);
  //     setSearching(false);
  //   }
  //   // eslint-disable-next-line
  // }, [filteredData, currentPage]);

  // let ellipsisLeft = false;
  // let ellipsisRight = false;
  // for(let i = 1; i <= pages; i++) {
  //   if(i === currentPage) {
  //     pagination.push(
  //       { id: i, current: true, ellipsis: false }
  //     );
  //   }else {
  //     if(i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1 ) {
  //       pagination.push(
  //         { id: i, current: false, ellipsis: false }
  //       );
  //     }else if( i > 1 && i < currentPage && !ellipsisLeft ) {
  //       pagination.push(
  //         { id: i, current: false, ellipsis: true }
  //       );
  //       ellipsisLeft = true;
  //     }else if( i < pages && i > currentPage && !ellipsisRight) {
  //       pagination.push(
  //         { id: i, current: false, ellipsis: true }
  //       );
  //       ellipsisRight = true;
  //     }
  //   }
  // } 

  const handlePageChange = (event: any, value: number) => {
    console.log(value)
    setPage(value);
  };

  //   const submitHandler = (e: any) => {
  //     e.preventDefault();
  //     if (search.trim() !== '') {
  //         setSearching(true);
  //         const copiedData = [...datas.data];
  //         const filtered = copiedData.filter(country => {
  //             let searchKey = 'name';
  //             if (datas.searchByData && datas.searchByData.length > 0) {
  //                 searchKey = searchBy;
  //             }
  //             return country[searchKey].toLowerCase().includes(search.trim().toLowerCase());
  //         });
  //         setFilteredData(filtered);
  //     } else {
  //         setFilteredData(datas.data);
  //     }
  //     setSearchFor(search);
  // }

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(e);
    setSearchTitle(e)
  }


  return (
    <Fragment>
      <div className="related-items items-start border mt-8 gap-y-5 bg-white">
        <br />
        <h1 className="mb-10 font-bold text-xl">CATEGORY PAGE</h1>
        <Link to={'/category/new-category'} className="py-2 px-4 bg-blue-400 hover:bg-blue-600 rounded-md text-white text-sm mt-8" >Add New</Link>


        <div>
          <form onSubmit={submitHandler} className="mt-7 mb-3 flex" style={{ justifyContent: 'center' }}>
            {/* {datas.searchByData && datas.searchByData.length > 0 &&
              <div className="select mr-2 border-2 border-gray-200 float-right ">
                <select className="border-black" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                  {datas.searchByData.map((data: any, index: any) => (
                    <option key={index} value={data.value}>{data.label}</option>
                  ))}
                </select>
              </div>
            } */}
            <div className="field mr-2">
              <div className="control">
                <input
                  type="text"
                  className="input  border-2 border-gray-200 rounded-xl p-2"
                  placeholder="Search Category..."
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
            </div>
          <button type="submit" className="button is-link border-2 border-gray-200 bg-blue-400 text-white p-2 rounded-xl">Search</button>
          </form>
          {/* {searchFor && <h2 className="mb-6 has-text-centered is-size-2">Search results for: "{searchFor}"</h2>} */}
        </div>

        <Fragment>

          <div className="flex flex-col p-3">

            <table className='border-collapse border border-blue-800 -mt-3 p-3 justify-center'>
              <thead className='bg-blue-400'>
                <tr>
                  <th className="border border-blue-600">Name</th>
                  <th className="border border-blue-600">Details</th>
                  <th className="border border-blue-600"></th>

                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => (
                  <tr key={item.id}>
                    <td className="border border-blue-600 text-justify p-3">{item.name}</td>
                    <td className="border border-blue-600 text-justify p-3">{item.details}</td>
                    <td className="border border-blue-600">
                      <Link to={"/category/update/" + item.id} className="badge badge-warning float-left ml-3 ">
                        <img src={updateSrc} className="" />
                      </Link>

                      <button className="float-right mr-3" onClick={() => { onDelete(item.id) }}>
                        <img src={deleteSrc} alt="" />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-full float-right">
            <nav className="flex float-right gap-x-3 w-full bg-white p-3 justify-center">
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
        </Fragment>
      </div>
    </Fragment>
  );
}
export default Category;



{/* <PaginationSearchCategoryPage  data={data} itemsPerPage={5} startFrom={15} searchByData={[
            { label: 'Search by name', value: 'name' },
            { label: 'Search by details', value: 'details' },
            
          ]} /> */}