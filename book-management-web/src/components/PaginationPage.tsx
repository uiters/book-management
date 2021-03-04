//@ts-ignore
import React, { Fragment } from 'react';
//@ts-ignore
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import categoryApi from '../services/api/categoryApi';
import { toastError, toastSuccess } from '../services/toastService';

import CategoryModel from '../types/models/CategoryModel';
import PaginationModel from '../types/models/PaginationModel';
import usePagination from './usePagination';
import updateSrc from '../assets/update-icon.png';
import deleteSrc from '../assets/delete-icon.png';

const PaginationPage = (datas: PaginationModel) => {
    const { slicedData, pagination, prevPage, nextPage, changePage } = usePagination(datas);
    console.log(datas)

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

    return (
        <Fragment>

            <div className="flex flex-col p-3">

                <table className='border-collapse border border-blue-800 mt-8 p-3 justify-center'>
                    <thead className='bg-blue-400'>
                        <tr>
                            <th className="border border-blue-600">Name</th>
                            <th className="border border-blue-600">Details</th>
                            <th className="border border-blue-600"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {slicedData.map((item: any) => (
                            <tr key={item.id}>
                                <td className="border border-blue-600">{item.name}</td>
                                <td className="border border-blue-600">{item.details}</td>
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
    );
}

export default PaginationPage;