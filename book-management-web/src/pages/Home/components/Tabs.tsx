const Tabs = () => {
  return (
    <div className="tabs flex gap-x-8 justify-center">
      <a href="/" className="font-bold text-lg text-blue-900">
        Home
      </a>
      <a href="/book" className="font-bold text-lg text-gray-500">
        Book
      </a>
      <a href="/Category" className="font-bold text-lg text-gray-500">
        Category
      </a>
      <a href="/Author" className="font-bold text-lg text-gray-500">
        Author
      </a>
      <a href="/Publisher" className="font-bold text-lg text-gray-500">
        Publisher
      </a>
    </div>
  );
};

export default Tabs;
