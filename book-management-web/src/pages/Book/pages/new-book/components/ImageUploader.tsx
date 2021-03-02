//@ts-ignore
import React, { useState, useRef } from "react";
//@ts-ignore
import ImageUploading, { ImageListType } from "react-images-uploading";

const ImageUploader = ({
  newBookCallBack,
}: {
  newBookCallBack: (imageList: ImageListType) => void;
}) => {
  const [images, setImages] = useState([]);
  const removeBtn = useRef(null);
  const maxNumber = 69;

  const onResetForm = () => {
    removeBtn.click();
  }

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
    newBookCallBack(imageList);
  };

  return (
    <div className="w-full border">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }: {
          imageList: ImageListType;
          onImageUpload: () => void;
          onImageRemoveAll: () => void;
          onImageUpdate: (index: number) => void;
          onImageRemove: (index: number) => void;
          isDragging: boolean;
          dragProps: {
            onDrop: (e: any) => void;
            onDragEnter: (e: any) => void;
            onDragLeave: (e: any) => void;
            onDragOver: (e: any) => void;
          };
        }) => (
          // write your building UI
          <div className="upload__image-wrapper flex items-start flex-col space-y-4 my-4  m-4">
            <div className="buttons flex">
              <button
                className="focus:outline-none bg-blue-500 rounded-md py-2 px-4 font-medium"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button
                className="focus:outline-none bg-red-400 rounded-md py-2 px-4 font-medium"
                onClick={onImageRemoveAll}
                ref={removeBtn}
              >
                Remove all images
              </button>
            </div>

            <div className="listImage flex space-x-4 space-y-3 w-full flex-wrap">
              {imageList.map((image: any, index: any) => (
                <div key={index} className="image-item w-1/3 space-y-4">
                  <img
                    src={image.dataURL}
                    alt=""
                    className="w-full h-auto"
                    style={{ maxHeight: "400px" }}
                  />
                  <div className="image-item__btn-wrapper space-x-4 flex">
                    <button
                      className="rounded bg-blue-200 px-4 py-2"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      className="rounded bg-red-200 px-4 py-2"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
