//@ts-ignore
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className="header flex gap-x-7 h-12 w-full">
      <div className="name w-32">
        <Link to = {'/'} className="font-bold text-2xl" >Booksy</Link>
      </div>
      <div className="search_bar flex-grow max-w-xl flex bg-gray-200 rounded-lg px-6 py-2 mx-auto">
        <input
          type="text"
          name=""
          id=""
          className="w-full outline-none bg-transparent text-lg font-bold"
          placeholder="Search by author, title, name"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 self-center"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="buttons flex gap-x-4 items-center justify-center">
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <button className="rounded-full w-8 h-8 bg-blue-900"><a href='/login'>T</a></button>
        <p className="font-bold">EN</p>
        <Link to = {'/login'} className="font-bold" >Login</Link>
        <Link to = {'/register'} className="font-bold" >Register</Link>
      </div>
    </div>
  );
};

export default Header;
