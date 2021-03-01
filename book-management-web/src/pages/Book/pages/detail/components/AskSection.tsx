const AskSection = () => {
  return (
    <div>
      <div className="ask-section flex flex-col items-start border my-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Hỏi đáp về sản phẩm</h1>
        <div className="input flex w-full gap-x-4">
          <input
            className="flex-grow focus:ring-2 focus:outline-none rounded-md p-4 border shadow-xl"
            type="text"
            placeholder="Hãy đặt câu hỏi về sản phẩm"
          />
          <button className="bg-yellow-500 rounded-md p-4 hover:bg-yellow-400">
            Gửi câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskSection;
