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

const Publisher = () => {

  const history = useHistory();

  const [data, setData] = useState<PublisherModelPage[]>([]);
  
  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const countPerPage = 3;

  const fetchData = useCallback(() => {
    publisherApi
      .getAllPublisher()
      .then((response) => {
        // console.log(response.data)
        setData(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  useEffect(() => {
    fetchData();
  }, [data.length]);

  // datas.push(<tr className = "hidden" key={""}>
  //   {/* <td className="border border-blue-600">{""}</td> */}
  //   <td className="border border-blue-600">{""}</td>
  //   <td>{}</td>
  // </tr>)

// listPublishers.forEach((publisher: PublisherModelPage) => {
//     datas.push(
//       <tr key={publisher.id}>
//         {/* <td className="border border-blue-600">{category.id}</td> */}
//         <td className="border border-blue-600 w-11/12  text-left">{publisher.name}</td>
//         <td className="border border-blue-600">
//           <Link to={"/publisher/update/" + publisher.id} className="badge badge-warning float-left ml-3">
//             <img src={updateSrc} className="" />
//           </Link>
        
//           <button className="float-right mr-3" onClick={() => { onDelete(publisher.id) }}>
//             <img src={deleteSrc} alt="" />
//           </button>
//         </td>
//       </tr>
//     );
//   });

//   const onDelete = (id: string) => {
//     Swal.fire({
//       title: 'Are you sure to delete this publisher?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         publisherApi
//           .deletePublisher(id)
//           .then((res) => {
//             console.log(res);
//             if (res.status === 200) {
//               toastSuccess("Delete  publisher success!");
//               window.location.reload();
//             }
//           })
//           .catch((errors) => {
//             toastError("Delete  publisher failed");
//           });
//       }
//     })
//   };

  return (
    
    // <div className="related-items  items-start border mt-8 p-4 gap-y-5 bg-white">
    //   <br />
    //   <h1 className="mb-10 font-bold text-xl">PUBLISHER PAGE</h1>
    //   <Link to={'/publisher/new-publisher'} className="py-2 px-4 bg-blue-400 hover:bg-blue-600 rounded-md text-white text-sm mt-8" >Add New</Link>

    //   <div className="flex flex-col">
    //     <table className='border-collapse border border-blue-800 mt-8'>
    //       <thead className='bg-blue-400'>
    //         <tr>
    //           {/* <th className="border border-blue-600">ID</th> */}
    //           <th className="border border-blue-600">Name</th>
    //           <th className="border border-blue-600"></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {datas}
    //       </tbody>
    //     </table>
    //   </div>

    // </div>
    <Fragment>
      <div className="related-items items-start border mt-8 gap-y-5 bg-white">
        <br />
        <h1 className="mb-10 font-bold text-xl">PUBLISHER PAGE</h1>
        <Link to={'/publisher/new-publisher'} className="py-2 px-4 bg-blue-400 hover:bg-blue-600 rounded-md text-white text-sm mt-8" >Add New</Link>

        <PaginationSearchPublisherPage  data={data} itemsPerPage={5} startFrom={15} searchByData={[
            { label: 'Search by name', value: 'name' },
            
          ]} />
      </div>
    </Fragment>
  );
}
export default Publisher;
