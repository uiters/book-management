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
import usePagination from '../../components/usePagination'
import PaginationModel from "../../types/models/PaginationModel";
import PaginationPage from '../../components/PaginationPage';


const Category = () => {

  const history = useHistory();
  // const datas = new Array;
  // const datas = [];
  // const [listCategorys, setListCategorys] = useState<CategoryModel[]>([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<CategoryModel[]>([]);
  
  
  // let pagingParams: PaginationModel = {
  //   data : [],
  //   startFrom: 1,
  //   itemsPerPage: 25,
  // };

  const fetchData = useCallback(() => {
    categoryApi
      .getAllCategorys()
      .then((response) => {
        // console.log(response)
        // setListCategorys(response.data);
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [data.length]);

  // // datas.push(<tr className="hidden" key={""}>
  // //   {/* <td className="border border-blue-600">{""}</td> */}
  // //   <td className="border border-blue-600">{""}</td>
  // //   <td className="border border-blue-600">{""}</td>
  // //   <td>{ }</td>
  // //   <td>{ }</td>
  // // </tr>)

  // // listCategorys.forEach((category: CategoryModel) => {
  // //   datas.push(
  // //     <tr key={category.id}>
  // //       {/* <td className="border border-blue-600">{category.id}</td> */}
  // //       <td className="border border-blue-600 text-left w-3/12">{category.name}</td>
  // //       <td className="border border-blue-600 text-left w-8/12">{category.details}</td>

  // //       <td className="border border-blue-600">
  // //       </td>
  // //     </tr>
  // //   );
  // // });

  // const onDelete = (id: string) => {
  //   Swal.fire({
  //     title: 'Are you sure to delete this category?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       categoryApi
  //         .deleteCategory(id)
  //         .then((res) => {
  //           console.log(res);
  //           if (res.status === 200) {
  //             toastSuccess("Delete  category success!");
  //             window.location.reload();
  //           }
  //         })
  //         .catch((errors) => {
  //           toastError("Delete  category failed");
  //         });
  //     }
  //   })
  // };

  return (
    <Fragment>
      <div className="related-items items-start border mt-8 gap-y-5 bg-white">
        <br />
        <h1 className="mb-10 font-bold text-xl">CATEGORY PAGE</h1>
        <Link to={'/category/new-category'} className="py-2 px-4 bg-blue-400 hover:bg-blue-600 rounded-md text-white text-sm mt-8" >Add New</Link>

        <PaginationPage  data={data} itemsPerPage={5} startFrom={25}/>
      </div>
    </Fragment>
  );
}
export default Category;
