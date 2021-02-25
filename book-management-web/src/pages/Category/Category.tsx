//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
//@ts-ignore
import {Link} from 'react-router-dom';
import { isConstructorTypeNode } from "typescript";
import categoryApi from '../../services/api/categoryApi';
import CategoryModel from '../../types/models/CategoryModel';
import { toastError, toastSuccess } from "../../services/toastService";

const Category = () => {

  // const datas = new Array;
  const datas = [];
  let elements = [];
  const [listCategorys, setListCategorys] = useState<CategoryModel[]>([]);

  const fetchData = useCallback(() => {
    categoryApi
      .getAllCategorys()
      .then((response) => {
        // console.log(response.data)
        setListCategorys(response.data);
        // response.data.forEach((category: CategoryModel) => {
        //   datas.push(
        //     <tr key={category.id}>
        //       <td className="border border-blue-600">{category.id}</td>
        //       <td className="border border-blue-600">{category.name}</td>
        //       <td className="border border-blue-600">{category.details}</td>
        //     </tr>
        //   );
        // });
        // console.log(datas);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    elements = listCategorys.forEach((category: CategoryModel) => {
      datas.push(
        <tr key={category.id}>
              <td className="border border-blue-600">{category.id}</td>
              <td className="border border-blue-600">{category.name}</td>
              <td className="border border-blue-600">{category.details}</td>
            </tr>
          );
        });
  }, [listCategorys.length]);
 

  return (
    <div>
      <br />
      <Link to={'/'} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm mt-8" >Add New</Link>

      <table className='border-collapse border border-blue-800 mt-8'>
        <thead>
          <tr>
            <th className="border border-blue-600"></th>
            <th className="border border-blue-600">ID</th>
            <th className="border border-blue-600">Name</th>
            <th className="border border-blue-600">Details</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  );
}
export default Category;
