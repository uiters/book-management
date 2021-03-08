//@ts-ignore
import { useHistory } from "react-router-dom";
//@ts-ignore
import { useForm } from "react-hook-form";
import axiosPublicClient from "../../services/axios/axiosPublicClient";
import { toastError, toastSuccess } from "../../services/toastService";
const Register = () => {
  const history = useHistory();
  interface FormData {
    Name: string;
    Username: string;
    Password: string;
    Email: string;
  }

  const { register, handleSubmit } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = handleSubmit(({ Name, Username, Password, Email } : FormData) => {
    axiosPublicClient
      .post("Users/register", { Name, Username, Password, Email })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Register success!");
        }
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // const onSubmit = handleSubmit(({name, email, password}) => {
  //     console.log(name, email, password);
  // })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        {/* <div className="text-center font-medium text-xl">
                    something
                </div> */}
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Register Form
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form action="" className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Name
            </label>
            <input
              ref={register({
                // required: true,
                minLength: 6,
                maxLength: 20,
              })}
              // style={{borderColor: errors.name ? "red":""}}
              // ref={register()}
              name="Name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {/* {errors.name && "Name is invalid"} */}
          </div>

          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Username
            </label>
            <input
              ref={register({
                // required: true,
                minLength: 6,
                maxLength: 20,
              })}
              // style={{borderColor: errors.name ? "red":""}}
              // ref={register()}
              name="Username"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {/* {errors.name && "Username is invalid"} */}
          </div>

          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Password
            </label>
            <input
              ref={register()}
              name="Password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              ref={register()}
              name="Email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
