//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
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
// import {PaginationModel} from '../../types/models/PaginationModel';


const Category = () => {

  type IdCategory = {
    Id: string;
  };

  const history = useHistory();
  // const datas = new Array;
  const datas = [];
  let elements = [];
  const [listCategorys, setListCategorys] = useState<CategoryModel[]>([]);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  
  const pageSizes = [3, 6, 9];

  const onChangeSearchTitle = (e : any) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  // const getRequestParams = (pagination : PaginationModel) => {
  //   let params = {};

  //   if (searchTitle) {
  //     params["title"] = searchTitle;
  //   }

  //   if (page) {
  //     params["page"] = page - 1;
  //   }

  //   if (pageSize) {
  //     params["size"] = pageSize;
  //   }

  //   return params;
  // };

  const fetchData = useCallback(() => {
    categoryApi
      .getAllCategorys()
      .then((response) => {
        // console.log(response.data)
        setListCategorys(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [listCategorys.length]);

  datas.push(<tr className="hidden" key={""}>
    {/* <td className="border border-blue-600">{""}</td> */}
    <td className="border border-blue-600">{""}</td>
    <td className="border border-blue-600">{""}</td>
    <td>{ }</td>
    <td>{ }</td>
  </tr>)

  listCategorys.forEach((category: CategoryModel) => {
    datas.push(
      <tr key={category.id}>
        {/* <td className="border border-blue-600">{category.id}</td> */}
        <td className="border border-blue-600 text-left w-3/12">{category.name}</td>
        <td className="border border-blue-600 text-left w-8/12">{category.details}</td>

        <td className="border border-blue-600">
          <Link to={"/category/update/" + category.id} className="badge badge-warning float-left ml-3 ">
            <img src={updateSrc} className="" />
          </Link>
        
          <button className="float-right mr-3" onClick={() => { onDelete(category.id) }}>
            <img src={deleteSrc} alt="" />
          </button>
        </td>
      </tr>
    );
  });

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
    <div className="related-items  items-start border mt-8 p-4 gap-y-5 bg-white">
      <br />
      <h1 className="mb-10 font-bold text-xl">CATEGORY PAGE</h1>
      <Link to={'/category/new-category'} className="py-2 px-4 bg-blue-400 hover:bg-blue-600 rounded-md text-white text-sm mt-8" >Add New</Link>
      <div className="flex flex-col">
        <table className='border-collapse border border-blue-800 mt-8'>
          <thead className='bg-blue-400'>
            <tr>
              {/* <th className="border border-blue-600">ID</th> */}
              <th className="border border-blue-600">Name</th>
              <th className="border border-blue-600">Details</th>
              <th className="border border-blue-600"></th>
            </tr>
          </thead>
          <tbody>
            {datas}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Category;
