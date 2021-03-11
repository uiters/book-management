//@ts-ignore
import { Pagination } from "@material-ui/lab";
//@ts-ignore
import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { PATHS } from "../../constants/paths";
import bookApi from "../../../../../services/api/bookApi";
import { toastError, toastSuccess } from "../../../../../services/toastService";
import AuthorModel from "../../../../../types/models/AuthorModel";
import BookModel from "../../../../../types/models/BookModel";
import CategoryModel from "../../../../../types/models/CategoryModel";
import PublisherModel from "../../../../../types/models/PublisherModel";
import categoryApi from "../../../../../services/api/categoryApi";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Book from "../../../../Home/components/Book";
//@ts-ignore
import { EventHandler } from "react";
import authorApi from "../../../../../services/api/authorApi";
import publisherApi from "../../../../../services/api/publisherApi";
// import srcSearch from '../../assets/loupe.png';
import ObjParamsModel from "../../../../../types/models/ObjParamsModel"

const Params = ({ handleCategoryChange, handleAuthorChange, handlePublisherChange }: {
  handleCategoryChange: (category: string) => void;
  handleAuthorChange: (author: string) => void;
  handlePublisherChange: (publisher: string) => void;
}) => {
  const [category, setCategory] = useState<CategoryModel[]>([]);
  const [author, setAuthor] = useState<AuthorModel[]>([]);
  const [publisher, setPublisher] = useState<PublisherModel[]>([]);

  const [selectCategory, setSelectCategory] = useState("");
  const [selectAuthor, setSelectAuthor] = useState("");
  const [selectPublisher, setSelectPublisher] = useState("");

  const [page, setPage] = useState(1);


  useEffect(() => {
    getCategoryParam()
    getAuthorParam()
    getPublisherParam()
  }, [category.length, author.length, publisher.length]);

  const getCategoryParam = () => {
    categoryApi
      .getForListParams()
      .then((response) => {
        setCategory(response.data)
      })
      .catch((error) => {
        toastError(error.response.data.message)
      })
  }

  const handleChangeCategory = (e: EventHandler) => {
    setSelectCategory(e.target.value)
    handleCategoryChange(e.target.value)
  }

  const getAuthorParam = () => {
    authorApi
      .getForListParams()
      .then((response) => {
        setAuthor(response.data)
      })
      .catch((error) => {
        toastError(error.response.data.message)
      })
  }

  const handleChangeAuthor = (e: EventHandler) => {

    setSelectAuthor(e.target.value)
    handleAuthorChange(e.target.value)
  }

  const handleChangePublisher = (e: EventHandler) => {
    setSelectPublisher(e.target.value)
    handlePublisherChange(e.target.value)
  }

  const getPublisherParam = () => {
    publisherApi
      .getForListParams()
      .then((response) => {
        setPublisher(response.data)
      })
      .catch((error) => {
        toastError(error.response.data.message)
      })
  }

  return (
    <div className="h-full w-full bg-white mt-3">
      <div className="w-full bg-white pt-5 pb-5">
        <FormControl component="fieldset">
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" defaultValue={selectCategory} value={selectCategory} onChange={handleChangeCategory}>
            {category?.map((item: any) => (
              <FormControlLabel key={item.id} value={item?.name} control={<Radio />} label={item?.name} />
            ))}
          </RadioGroup>
        </FormControl>
      </div>

      <div className="w-full mt-2 p-2 pt-5 pb-5 bg-white">
        <FormControl component="fieldset">
          <FormLabel>Author</FormLabel>
          <RadioGroup aria-label="gender2" name="gender2" defaultValue={selectAuthor} value={selectAuthor} onChange={handleChangeAuthor}>
            {author?.map((item: any) => (
              <FormControlLabel key={item.id} value={item?.name} control={<Radio />} label={item?.name} />
            ))}
          </RadioGroup>
        </FormControl>
      </div>

      <div className="w-full mt-2 p-2 pt-5 pb-5 bg-white">
        <FormControl component="fieldset">
          <FormLabel>Publisher</FormLabel>
          <RadioGroup aria-label="gender3" name="gender3" defaultValue={selectPublisher} value={selectPublisher} onChange={handleChangePublisher}>
            {publisher?.map((item: any) => (
              <FormControlLabel key={item.id} value={item?.name} control={<Radio />} label={item?.name} />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default Params;