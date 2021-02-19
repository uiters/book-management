import banner from "../../../assets/banner.svg";

const Banner = () => {
    return (
        <div className="banner mt-12 flex rounded-2xl bg-yellow-100 px-10">
            <div className="banner-texts space-y-4 flex flex-col flex-grow items-start justify-center">
              <p className="text-5xl font-bold text-blue-800">
                Build your library
              </p>
              <p className="text-lg font-bold text-gray-400">
                Buy two selected books and get one free
              </p>
              <button className="font-bold text-lg px-6 py-2 bg-yellow-300 text-white rounded-xl focus:outline-none">
                View all
              </button>
            </div>
            <img src={banner} alt="Banner" className="w-5/12 pr-8" />
          </div>
    );
}

export default Banner;