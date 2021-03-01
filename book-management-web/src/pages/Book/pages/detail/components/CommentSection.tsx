const CommentSection = () => {
  return (
    <div>
      <div className="comment-section flex flex-col items-start border my-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Khách hàng nhận xét</h1>
        <div className="comment-list w-full">
          <div className="comment mt-4 border-t pt-6">
            <div className="user-info flex gap-x-4 mb-2">
              <img
                src="https://www.flaticon.com/svg/vstatic/svg/1077/1077114.svg?token=exp=1614223432~hmac=0ad5992b9c3fbf42a81feadd9a78cbbc"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="name-date flex flex-col items-start gap-y-1">
                <p className="text-lg">Phạm Trung Trường</p>
                <p>Nhận xét vào ngày 31 tháng 12, 2020</p>
              </div>
            </div>
            <div className="content">
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis accusantium laborum tenetur porro laudantium
                praesentium omnis doloremque vel at nihil.
              </p>
            </div>
          </div>
          <div className="comment mt-4 border-t pt-6">
            <div className="user-info flex gap-x-4 mb-2">
              <img
                src="https://www.flaticon.com/svg/vstatic/svg/1077/1077114.svg?token=exp=1614223432~hmac=0ad5992b9c3fbf42a81feadd9a78cbbc"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="name-date flex flex-col items-start gap-y-1">
                <p>Username</p>
                <p>Nhận xét vào ngày 31 tháng 12, 2020</p>
              </div>
            </div>
            <div className="content">
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis accusantium laborum tenetur porro laudantium
                praesentium omnis doloremque vel at nihil.
              </p>
            </div>
          </div>
          <div className="comment mt-4 border-t pt-6">
            <div className="user-info flex gap-x-4 mb-2">
              <img
                src="https://www.flaticon.com/svg/vstatic/svg/1077/1077114.svg?token=exp=1614223432~hmac=0ad5992b9c3fbf42a81feadd9a78cbbc"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="name-date flex flex-col items-start gap-y-1">
                <p>Username</p>
                <p>Nhận xét vào ngày 31 tháng 12, 2020</p>
              </div>
            </div>
            <div className="content">
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis accusantium laborum tenetur porro laudantium
                praesentium omnis doloremque vel at nihil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
