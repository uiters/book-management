const Tabs = () => {
  return (
    <div className="tabs flex gap-x-8 justify-center">
      <a href="/Home" className="font-bold text-lg text-blue-900">
        Home
      </a>
      <a href="/bestseller" className="font-bold text-lg text-gray-500">
        Bestseller
      </a>
      <a href="/Category" className="font-bold text-lg text-gray-500">
        Category
      </a>
      <a href="/Store" className="font-bold text-lg text-gray-500">
        Find a store
      </a>
      <a href="/Blog" className="font-bold text-lg text-gray-500">
        Blog
      </a>
    </div>
  );
};

export default Tabs;
