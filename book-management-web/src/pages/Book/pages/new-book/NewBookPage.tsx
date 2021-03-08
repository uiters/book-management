//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import bookApi from "../../../../services/api/bookApi";
//@ts-ignore
import React, { useState } from "react";
//@ts-ignore
import { useHistory } from "react-router-dom";
//@ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
//@ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toastSuccess, toastError } from "../../../../services/toastService";
import ImageUploader from "./components/ImageUploader";
import { ImageListType } from "react-images-uploading";
import { PATHS } from "../../../../constants/paths";
import NewBookFormData from "../../../../types/form/NewBookFormData";

const NewBookPage = () => {
  const [photoList, setPhotoList] = useState<ImageListType>([]);
  const [isLeave, setIsLeave] = useState<Boolean>(false);
  const [description, setDescription] = useState<string>("");
  const { register, handleSubmit, errors, reset } = useForm<NewBookFormData>({
    mode: "onChange",
    reValidateModel: "onChange",
  });
  const history = useHistory();

  const onSubmit = (formData: NewBookFormData) => {
    formData.photos = photoList;
    console.log(formData);

    bookApi
      .addNewBook(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Create new book success!");
          if (isLeave) {
            history.push(PATHS.BOOK + "/" + res.data);
          } else {
            reset();
          }
        }
      })
      .catch((error) => {
        toastError("Create new book failed");
      });
  };

  const onImageChanged = (images: ImageListType) => {
    console.log(images);
    const photoFiles = images.map((image) => image.file);
    setPhotoList(photoFiles);
    console.log("abc");
  };

  return (
    <div className="flex flex-col w-full mt-6 items-center bg-white">
      <div className="title">
        <h1 className="font-bold text-xl pt-4">New Book</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4 w-full p-4"
      >
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="title" className="font-bold text-gray-500">
            Title
          </label>
          <div className="input border w-full p-2">
            <input
              ref={register({ required: true, maxLength: "200" })}
              type="text"
              placeholder="Insert Title here"
              name="title"
              className="focus:outline-none w-full"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.title?.type === "required" && "Title is required!"}
            {errors.title?.type === "maxLength" && "Title is max 200 chars!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="description" className="font-bold text-gray-500">
            Description:
          </label>
          <div className="input border w-full p-2">
            <textarea
              className="w-full focus:outline-none"
              placeholder="Insert Description here"
              defaultValue=""
              ref={register({ required: "true" })}
              name="description"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.description?.type == "required" &&
              "Description is required!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="description" className="font-bold text-gray-500">
            Images
          </label>
          <ImageUploader newBookCallBack={onImageChanged}></ImageUploader>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="price" className="font-bold text-gray-500">
            Price:
          </label>
          <div className="w-full p-2 border">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Insert Price here"
              ref={register({
                required: true,
                pattern: /[0-9]*$/i,
              })}
              name="price"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.price?.type == "pattern" && "Price is number only!"}
            {errors.price?.type == "required" && "Price is required!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="pages" className="font-bold text-gray-500">
            Pages:
          </label>
          <div className="input w-full border p-2">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Insert Pages here"
              defaultValue="300"
              ref={register({ required: true })}
              name="pages"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.pages?.type == "required" && "Pages is required!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="sku" className="font-bold text-gray-500">
            SKU:
          </label>
          <div className="input border w-full p-2">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Insert SKU here"
              defaultValue="SKUXXXXXXXX"
              ref={register({ required: true })}
              name="sku"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.sku?.type == "required" && "Sku is required!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="authorName" className="font-bold text-gray-500">
            Author' Name:
          </label>
          <div className="input border w-full p-2">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Insert Author's Name here"
              defaultValue=""
              ref={register({ required: true })}
              name="authorName"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.authorName?.type == "required" &&
              "Author's Name is required!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="publisherName" className="font-bold text-gray-500">
            Publisher's Name:
          </label>
          <div className="input border p-2 w-full">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Insert Publisher's Name here"
              defaultValue=""
              ref={register({ required: true })}
              name="publisherName"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.publisherName?.type == "required" &&
              "Publisher is required!"}
          </span>
        </div>
        <div className="submit_buttons mx-auto w-full space-x-5 border p-4">
          <button className="focus:outline-none bg-red-600 hover:bg-red-400 rounded-lg p-2 text-white font-bold w-auto">
            <a className="p-2" href={PATHS.BOOK}>Cancel</a>
          </button>
          <button
            type="submit"
            className="focus:outline-none bg-blue-600 hover:bg-blue-400 rounded-lg p-2 text-white font-bold w-auto"
          >
            Submit & Reset
          </button>
          <button
            type="submit"
            className="focus:outline-none bg-blue-600 hover:bg-blue-400 rounded-lg p-2 text-white font-bold w-auto"
            onClick={() => {
              setIsLeave(true);
            }}
          >
            Submit & Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBookPage;
