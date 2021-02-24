//@ts-ignore
import { useHistory } from "react-router-dom";
//@ts-ignore
import { useForm } from "react-hook-form";
import axiosPublicClient from "../../services/axios/axiosPublicClient";

const Login = () => {
  const history = useHistory();

  interface FormData {
    Username: string;
    Password: string;
    Email: string;
  }

  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = handleSubmit(({ Username, Password, Email }: FormData) => {
    axiosPublicClient
      .post("/api/Users/login", { Username, Password, Email })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
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
              ref={register()}
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
              ref={register({required: true})}
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

          <div className="flex items-center justify-between">
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
