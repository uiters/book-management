//@ts-ignore
import { useHistory } from "react-router-dom";
//@ts-ignore
import { useForm } from "react-hook-form";
import axiosPublicClient from "../../services/axios/axiosPublicClient";
import { toastError, toastSuccess } from "../../services/toastService";
import { PATHS } from "../../constants/paths";
const Login = () => {
  const history = useHistory();

  interface FormData {
    Username: string;
    Password: string;
    Email: string;
  }

  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: "onChange",
    reValidateModel: "onChange",
  });

  const onSubmit = handleSubmit(({ Username, Password, Email }: FormData) => {
    axiosPublicClient
      .post("Users/login", { Username, Password, Email })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Login success!");
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        history.push(PATHS.MAIN);
      })
      .catch((err) => {
        console.log(err);
        toastError(err.response.data.message);
      });
  });

  let signOut = () => {
    localStorage.removeItem("user");
  };

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
          Login Form
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form action="" className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Username
            </label>
            <input
              ref={register({
                required: true
              })}
              style={{borderColor: errors.name ? "red":""}}
              name="Username"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <span className="text-left items-start flex text-red-400">
              {errors.Username?.type == "required" && "Username is required!"}           
            </span>
            
          </div>

          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Password
            </label>
            <input
              ref={register({
                required: true,
                pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i
              })}
              style={{borderColor: errors.name ? "red":""}}
              name="Password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <span className="text-left items-start flex text-red-400">
              {errors.Password?.type == "required" && "Password is required!"}
              {errors.Password?.type == "pattern" && "Password is include 1 Uppercase, 1 Lowercase, 1 number and min 8 character!"}
            </span>
          </div>

          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              ref={register({
                required: true,
                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
              })}
              name="Email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <span className="text-left items-start flex text-red-400">
              {errors.Email?.type == "required" && "Email is required!"}
              {errors.Email?.type == "pattern" && "Email is invalid!"}
            </span>
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

export default Login;


{/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 v-4 text-blue-300 rounded"
              />
              <label htmlFor="" className="ml-2 text-sm text-gray-600">
                Remember Me
              </label>
            </div>
            <div>
              <a href="" className="font-medium text-sm text-blue-500">
                Forgot Password?
              </a>
            </div>
          </div> */}