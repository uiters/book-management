//@ts-ignore
import React from "react";
//@ts-ignore
import { useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import { PATHS } from "../../../../constants/paths";
import bookApi from "../../../../services/api/bookApi";
import NewBookFormData from "../../../../types/form/NewBookFormData";
import ImageUploader from "../new-book/components/ImageUploader";

const UpdateBookPage = () => {
  const { register, handleSubmit, errors, reset } = useForm<NewBookFormData>({
    mode: "onChange",
    revalidateModel: "onChange",
  });

  const onSubmit = (formData: NewBookFormData) => {
    console.log(formData);

    bookApi
      .addNewBook(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
        }
      })
      .catch((error) => {});
  };

  const onImageChanged = (images: ImageListType) => {
    console.log(images);
    const photoFiles = images.map((image) => image.file);
    console.log("abc");
  };

  return (
    <div className="flex flex-col w-full mt-6 items-center bg-white">
      <div className="title">
        <h1 className="font-bold text-xl pt-4">Update Book</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6 w-full p-5"
      >
        <div className="form-group border p-4">
          <div className="input flex gap-2">
            <label htmlFor="title" className="font-bold text-gray-500">
              Title :
            </label>
            <span className="flex-grow">
              <input
                ref={register({ required: true, maxLength: "20" })}
                type="text"
                placeholder="Insert Title here"
                name="title"
                className="focus:outline-none w-full"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.title?.type == "required" && "Title is required!"}
            {errors.title?.type == "maxLength" && "Title is max 20 chars!"}
          </span>
        </div>
        <div className="form-group border p-4">
          <div className="input flex gap-2">
            <label htmlFor="description" className="font-bold text-gray-500">
              Description:
            </label>
            <span className="flex-grow">
              <textarea
                className="w-full focus:outline-none"
                placeholder="Insert Description here"
                defaultValue=""
                ref={register({ required: "true" })}
                name="description"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.description?.type == "required" &&
              "Description is required!"}
          </span>
        </div>
        <div className="form-group flex items-start">
          <ImageUploader newBookCallBack={onImageChanged}></ImageUploader>
        </div>
        <div className="form-group border p-4">
          <div className="flex gap-2">
            <label htmlFor="price" className="font-bold text-gray-500">
              Price:
            </label>
            <span className="flex-grow">
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
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.price?.type == "pattern" && "Price is number only!"}
            {errors.price?.type == "required" && "Price is required!"}
          </span>
        </div>
        <div className="form-group border p-4">
          <div className="input flex gap-2">
            <label htmlFor="pages" className="font-bold text-gray-500">
              Pages:
            </label>
            <span className="flex-grow">
              <input
                className="w-full focus:outline-none"
                type="text"
                placeholder="Insert Pages here"
                defaultValue="300"
                ref={register({ required: true })}
                name="pages"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.pages?.type == "required" && "Pages is required!"}
          </span>
        </div>
        <div className="form-group border p-4">
          <div className="input flex gap-2">
            <label htmlFor="sku" className="font-bold text-gray-500">
              SKU:
            </label>
            <span className="flex-grow">
              <input
                className="w-full focus:outline-none"
                type="text"
                placeholder="Insert SKU here"
                defaultValue="SKUXXXXXXXX"
                ref={register({ required: true })}
                name="sku"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.sku?.type == "required" && "Sku is required!"}
          </span>
        </div>
        <div className="form-group border p-4">
          <div className="input flex gap-2">
            <label htmlFor="authorName" className="font-bold text-gray-500">
              Author' Name:
            </label>
            <span className="flex-grow">
              <input
                className="w-full focus:outline-none"
                type="text"
                placeholder="Insert SKU here"
                defaultValue=""
                ref={register({ required: true })}
                name="authorName"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.authorName?.type == "required" &&
              "Author's Name is required!"}
          </span>
        </div>
        <div className="form-group border p-4">
          <div className="input flex gap-2">
            <label htmlFor="publisherName" className="font-bold text-gray-500">
              Publisher's Name:
            </label>
            <span className="flex-grow">
              <input
                className="w-full focus:outline-none"
                type="text"
                placeholder="Insert SKU here"
                defaultValue=""
                ref={register({ required: true })}
                name="publisherName"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.publisherName?.type == "required" &&
              "Publisher is required!"}
          </span>
        </div>
        <div className="submit_buttons mx-auto w-full space-x-5 border p-4">
          <button className="focus:outline-none bg-red-600 hover:bg-red-400 rounded-lg p-2 text-white font-bold w-auto">
            <a href={PATHS.MAIN}>Cancel</a>
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
            onClick={() => {}}
          >
            Submit & Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBookPage;
