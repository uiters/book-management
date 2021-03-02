//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
//@ts-ignore
import { Link } from 'react-router-dom';
import { isConstructorTypeNode } from "typescript";
import publisherApi from "../../services/api/publisherApi";
import { toastError, toastSuccess } from "../../services/toastService";
import PublisherModelPage from "../../types/models/PublisherModelPage";
import Swal from 'sweetalert2';
//@ts-ignore
import { useHistory } from "react-router-dom";

const Publisher = () => {

  type IdCategory = {
    Id: string;
  };


  // const datas = new Array;
  const datas = [];
  let elements = [];
  const [listPublishers, setListPublishers] = useState<PublisherModelPage[]>([]);

  const fetchData = useCallback(() => {
    publisherApi
      .getAllPublisher()
      .then((response) => {
        // console.log(response.data)
        setListPublishers(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [listPublishers.length]);

  datas.push(<tr className = "hidden" key={""}>
    {/* <td className="border border-blue-600">{""}</td> */}
    <td className="border border-blue-600">{""}</td>
    <td>{}</td>
  </tr>)

listPublishers.forEach((publisher: PublisherModelPage) => {
    datas.push(
      <tr key={publisher.id}>
        {/* <td className="border border-blue-600">{category.id}</td> */}
        <td className="border border-blue-600">{publisher.name}</td>
        <td className="border border-blue-600">
          <Link to={"/publisher/update/" + publisher.id} className="badge badge-warning ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            Update
          </Link>
        </td>
        <td className="border border-blue-600">
          <button onClick={() => { onDelete(publisher.id) }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Delete
          </button>
        </td>
      </tr>
    );
  });

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
              window.location.reload();
            }
          })
          .catch((errors) => {
            toastError("Delete  publisher failed");
          });
      }
    })
  };

  return (
    
    <div className="mt-16 ml-10">
      <br />
      <Link to={'/author/new-author'} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm mt-8" >Add New</Link>

      <table className='border-collapse border border-blue-800 mt-8'>
        <thead>
          <tr>
            {/* <th className="border border-blue-600">ID</th> */}
            <th className="border border-blue-600">Name</th>
            <th className="border border-blue-600"></th>
            <th className="border border-blue-600"></th>
          </tr>
        </thead>
        <tbody>
          {datas}
        </tbody>
      </table>
    </div>
  );
}
export default Publisher;
