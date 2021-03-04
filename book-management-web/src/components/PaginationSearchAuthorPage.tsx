//@ts-ignore
import React, { Fragment, useState, useEffect } from 'react';
//@ts-ignore
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import categoryApi from '../services/api/categoryApi';
import { toastError, toastSuccess } from '../services/toastService';
import PaginationModel from '../types/models/PaginationModel';
import usePagination from './usePagination';
import updateSrc from '../assets/update-icon.png';
import deleteSrc from '../assets/delete-icon.png';
import authorApi from '../services/api/authorApi';
import AuthorModelPage from '../types/models/AuthorModelPage';

const PaginationSearchAuthorPage = (datas: PaginationModel) => {

    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState(datas.searchByData && datas.searchByData.length > 0 ? datas.searchByData[0].value : '');
    const [searchFor, setSearchFor] = useState('');

    const { slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching } = usePagination(datas);
    console.log(datas)

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (search.trim() !== '') {
            setSearching(true);
            const copiedData = [...datas.data];
            const filtered = copiedData.filter(country => {
                let searchKey = 'name';
                if (datas.searchByData && datas.searchByData.length > 0) {
                    searchKey = searchBy;
                }
                return country[searchKey].toLowerCase().includes(search.trim().toLowerCase());
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(datas.data);
        }
        setSearchFor(search);
    }

    const onSearchFieldChange = () => {
        if (search.trim() !== '') {
            setSearching(true);
            const copiedData = [...datas.data];
            const filtered = copiedData.filter(country => {
                let searchKey = 'name';
                if (datas.searchByData && datas.searchByData.length > 0) {
                    searchKey = searchBy;
                }
                return country[searchKey].toLowerCase().includes(search.trim().toLowerCase());
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(datas.data);
        }
        setSearchFor(search);
    }

    useEffect(() => {
        onSearchFieldChange();
    }, [search])

    const onDelete = (id: string) => {
        Swal.fire({
          title: 'Are you sure to delete this author?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
            authorApi
              .deleteAuthor(id)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  toastSuccess("Delete  author success!");
                  window.location.reload();
                //   const removedList = listAuthors.filter((author: AuthorModelPage) => author.id !== id);
                //   setListAuthors(removedList);
                }
              })
              .catch((errors) => {
                toastError("Delete  author failed");
              });
          }
        })
      };

    return (
        <div>
            <form onSubmit={submitHandler} className="mt-7 mb-3 flex" style={{ justifyContent: 'center' }}>
                {datas.searchByData && datas.searchByData.length > 0 &&
                    <div className="select mr-2 border-2 border-gray-200 float-right ">
                        <select className="border-black" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                            {datas.searchByData.map((data: any, index: any) => (
                                <option key={index} value={data.value}>{data.label}</option>
                            ))}
                        </select>
                    </div>
                }
                <div className="field mr-2">
                    <div className="control">
                        <input
                            type="text"
                            className="input  border-2 border-gray-200 rounded-xl"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="button is-link border-2 border-gray-200 bg-gray-200">Search</button>
            </form>
            {searchFor && <h2 className="mb-6 has-text-centered is-size-2">Search results for: "{searchFor}"</h2>}

            <Fragment>
                <div className="flex flex-col p-3">

                    <table className='border-collapse border border-blue-800 -mt-3 p-3 justify-center'>
                        <thead className='bg-blue-400'>
                            <tr>
                                <th className="border border-blue-600">Name</th>
                                <th className="border border-blue-600">Descriptions</th>
                                <th className="border border-blue-600"></th>

                            </tr>
                        </thead>
                        <tbody>
                            {slicedData.map((item: any) => (
                                <tr key={item.id}>
                                    <td className="border border-blue-600 w-3/12">{item.name}</td>
                                    <td className="border border-blue-600 w-8/12">{item.description}</td>
                                    <td className="border border-blue-600">
                                        <Link to={"/author/update/" + item.id} className="badge badge-warning float-left ml-3 ">
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
                <div className="flex mt-8 float-right">
                    <nav className="flex float-right gap-x-3 w-full bg-white p-3">
                        <a href="/#" className="pagination-previous items-center flex justify-center" onClick={prevPage}>Previous</a>

                        <ul className="pagination-list flex gap-x-2">
                            {pagination.map((page) => {
                                if (!page.ellipsis) {
                                    return <li key={page.id}>
                                        <button
                                            className={page.current ? 'pagination-link is-current p-3' : 'pagination-link' + " p-3 bg-gray-300 focus:outline-none"}
                                            onClick={(e) => changePage(page.id, e)}>
                                            {page.id}
                                        </button>
                                    </li>;
                                } else {
                                    return <li key={page.id}><span className="pagination-ellipsis">&hellip;</span></li>
                                }
                            }
                            )}
                        </ul>
                        <a href="/#" className="pagination-next items-center flex justify-center" onClick={nextPage}>Next page</a>
                    </nav>
                </div>
            </Fragment>
        </div>
    );
}

export default PaginationSearchAuthorPage;