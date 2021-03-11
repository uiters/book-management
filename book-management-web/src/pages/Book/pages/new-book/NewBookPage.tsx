//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import bookApi from "../../../../services/api/bookApi";
//@ts-ignore
import React, { useState, useEffect } from "react";
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
import NewBookInputData from "../../../../types/form/NewBookInputData";
import DropDownInput from "../../../../components/DropDownInput";

const NewBookPage = () => {
  const history = useHistory();
  const [photoList, setPhotoList] = useState<ImageListType>([]);
  const [isLeave, setIsLeave] = useState<Boolean>(false);
  const [authorName, setAuthorName] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [inputData, setInputData] = useState<NewBookInputData>({
    authors: [],
    publishers: [],
    categories: [],
  });
  const { register, handleSubmit, errors, reset } = useForm<NewBookFormData>({
    mode: "onChange",
    reValidateModel: "onChange",
  });

  const getInputFormData = () => {
    bookApi
      .getNewBookFormData()
      .then((response) => {
        console.log(response.data);
        setInputData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInputFormData();
  }, [JSON.stringify(inputData)]);

  const onSubmit = (formData: NewBookFormData) => {
    formData.photos = photoList;
    formData.authorName = authorName;
    formData.publisherName = publisherName;
    formData.categoryName = categoryName;

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
        console.log(error);
        
        toastError("Create new book failed");
      });
  };

  const onSelectChanged = (value: string, type: string) => {
    console.log(value);
    console.log(type);
    if (type === "Category") {
      setCategoryName(value);
    } else if (type === "Author") {
      setAuthorName(value);
    } else if (type === "Publisher") {
      setPublisherName(value);
    }
  };

  const onImageChanged = (images: ImageListType) => {
    const photoFiles = images.map((image) => image.file);
    setPhotoList(photoFiles);
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
                pattern: /^[0-9]*$/i,
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
              ref={register({ required: true, pattern: /^[0-9]*$/i })}
              name="pages"
            />
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.pages?.type == "pattern" && "Pages is number only!"}
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
          <DropDownInput
            data={inputData.categories}
            name="Category's Name:"
            selectHandler={onSelectChanged}
            type="Category"
          ></DropDownInput>
          <span className="text-left items-start flex text-red-400">
            {errors.publisherName?.type == "required" &&
              "Publisher is required!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <DropDownInput
            data={inputData.authors}
            name="Author's Name:"
            type="Author"
            selectHandler={onSelectChanged}
          ></DropDownInput>
          <span className="text-left items-start flex text-red-400">
            {errors.authorName?.type == "required" &&
              "Author's Name is required!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start gap-2">
          <DropDownInput
            data={inputData.publishers}
            name="Publisher's Name:"
            type="Publisher"
            selectHandler={onSelectChanged}
          ></DropDownInput>
          <span className="text-left items-start flex text-red-400">
            {errors.publisherName?.type == "required" &&
              "Publisher is required!"}
          </span>
        </div>
        <div className="submit_buttons mx-auto w-full space-x-5 border p-4">
          <button className="focus:outline-none bg-red-600 hover:bg-red-400 rounded-lg p-2 text-white font-bold w-auto">
            <a className="p-2" href={PATHS.BOOK}>
              Cancel
            </a>
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
