//@ts-ignore
import React, { useState, useEffect, useCallback, Fragment } from "react";
//@ts-ignore
import { Link } from 'react-router-dom';
import { isConstructorTypeNode } from "typescript";
import publisherApi from "../../services/api/publisherApi";
import { toastError, toastSuccess } from "../../services/toastService";
import PublisherModelPage from "../../types/models/PublisherModelPage";
import Swal from 'sweetalert2';
//@ts-ignore
import { useHistory } from "react-router-dom";

import updateSrc from '../../assets/update-icon.png';
import deleteSrc from '../../assets/delete-icon.png';
import PaginationSearchPublisherPage from "../../components/PaginationSearchPublisherPage";
import { Pagination } from "@material-ui/lab";

const Publisher = () => {
  const history = useHistory();

  const [data, setData] = useState<PublisherModelPage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchKey, setSearchKey] = useState(1);
  const countPerPage = 5;

  const getPubisherPage = () => {
    publisherApi
      .getPagedPublisher(searchKey, searchTitle, page, countPerPage)
      .then((response) => {
        console.log(response)
        setData(response.data.items)
        setTotalPage(response.data.totalPage)
        setTotalCount(response.data.totalCount)
        console.log(searchKey)
      })
      .catch((error) => {
        toastError(error.response.data.message)
      })
  }

  useEffect(() => {
    getPubisherPage();
  }, [page, searchTitle, searchKey]);

  const onDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure to delete this publisher?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        publisherApi
          .deletePublisher(id)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              toastSuccess("Delete  publisher success!");
              const removedList = data.filter((publisher: PublisherModelPage) => publisher.id !== id);
              setData(removedList);
              setTimeout(function() { //Start the timer
                window.location.reload();
              }.bind(this), 5000)
            }
          })
          .catch((errors) => {
            toastError("Delete  publisher failed");
          });
      }
    })
  };

  const handlePageChange = (event: any, value: number) => {
    console.log(value)
    setPage(value);
  };

  const hitButtonSearch = () => {
    setPage(1);
    setSearchTitle(searchTitle);
    setSearchKey(searchKey);
  }

  const onChangeValueInputSearch = (e: any) => {
    setPage(1);
    setSearchTitle(e.target.value)
  }

  return (
    <Fragment>
      <div className="related-items items-start border mt-8 gap-y-5 bg-white">
        <br />
        <h1 className="mb-10 font-bold text-2xl float-center">PUBLISHER PAGE</h1>
        <Link to={'/publisher/new-publisher'} className="py-3 px-6 bg-blue-400 hover:bg-blue-600 rounded-md text-white text-sm mt-8" >Add New</Link>


        <div>
          <div className="mt-7 mb-3 ml-56 mr-28 flex" style={{ justifyContent: 'between' }}>
            <div className="select mr-2 border-2 border-gray-200 float-right w-1/5">
              <select 
                  value={searchKey} 
                  onChange={e => setSearchKey(e.currentTarget.value)}
                  className = "p-2 rounded-xl w-11/12"
                   >
                <option value="1">Search by Name</option>
              </select>
            </div>
            <div className="field mr-2 w-3/5">
              <div className="control">
                <input
                  type="text"
                  className="input  border-2 border-gray-200 rounded-xl p-2 float-left w-full"
                  placeholder="Search Publisher..."
                  value={searchTitle}
                  onChange={(e) => {onChangeValueInputSearch(e)}}
                />
              </div>
            </div>
            <button onClick={hitButtonSearch} className="button is-link border-2 border-gray-200 bg-blue-400 text-white p-2 rounded-xl w-40 hover:bg-blue-600">Search</button>
          </div>
          {searchTitle && <h2 className="mb-6 has-text-centered is-size-2">Search results for: "{searchTitle}"</h2>}
        </div>

        <Fragment>

          <div className="flex flex-col p-3">

            <table className='border-collapse border border-blue-800 -mt-3 p-3 justify-center'>
              <thead className='bg-blue-400'>
                <tr>
                  <th className="border border-blue-600 w-11/12">Name</th>
                  <th className="border border-blue-600"></th>

                </tr>
              </thead>
              <tbody>
                {totalCount == 0 &&
                  <tr>
                    <td className="border-l-2">Don't have data to show</td>
                    <td className="border-r-2"></td>
                  </tr>
                }

                {totalCount > 0 && data.map((item: any) => (
                  <tr key={item.id}>
                    <td className="border border-blue-600 text-justify p-3">{item.name}</td>
                    <td className="border border-blue-600">
                      <Link to={"/publisher/update/" + item.id} className="badge badge-warning float-left ml-3 ">
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
export default Publisher;
