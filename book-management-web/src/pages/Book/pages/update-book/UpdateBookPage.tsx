//@ts-ignore
import React, { useState, useEffect } from "react";
//@ts-ignore
import { useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
//@ts-ignore
import { useParams } from "react-router-dom";
import { PATHS } from "../../../../constants/paths";
import bookApi from "../../../../services/api/bookApi";
import NewBookFormData from "../../../../types/form/NewBookFormData";
import BookModel from "../../../../types/models/BookModel";
import ImageUploader from "../new-book/components/ImageUploader";

const UpdateBookPage = () => {
  const [book, setBook] = useState<BookModel>({
    id: "",
    title: "",
  });

  const { register, handleSubmit, errors, reset } = useForm<NewBookFormData>({
    mode: "onChange",
    revalidateModel: "onChange",
  });

  const { bookId } = useParams();

  const getBookData = () => {
    bookApi
      .getById(bookId)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
        console.log(book);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  useEffect(() => {
    getBookData();
  }, [book.id]);

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
        <h1 className="font-bold text-xl pt-4">Update book</h1>
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
              ref={register({ required: true, maxLength: "20" })}
              type="text"
              placeholder="Insert title here!"
              defaultValue={book.title}
              name="title"
              className="focus:outline-none w-full"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.title?.type === "required" && "Title is required!"}
            {errors.title?.type === "maxLength" && "Title is max 20 chars!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <label htmlFor="description" className="font-bold text-gray-500">
            Description:
          </label>
          <div className="input border w-full p-2">
            <textarea
              className="w-full focus:outline-none"
              placeholder="Insert description here!"
              defaultValue={book.description}
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
              defaultValue={book.price}
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
              defaultValue={book.pages}
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
              defaultValue={book.sku}
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
              defaultValue={book.authorName}
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
              defaultValue={book.publisherName}
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
            <a href={PATHS.BOOK}>Cancel</a>
          </button>
          <button
            type="submit"
            className="focus:outline-none bg-blue-600 hover:bg-blue-400 rounded-lg p-2 text-white font-bold w-auto"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBookPage;
