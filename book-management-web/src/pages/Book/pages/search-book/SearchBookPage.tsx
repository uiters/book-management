//@ts-ignore
import React, { useState, useEffect } from "react";
import ListSearchBook from "./components/ListSearchBook";
import Params from "./components/Params";

const SearchBookPage = () => {

  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");

    const handleChangeCategory =(categoryParam : string) => {
      setCategory(categoryParam)
    }

    const handleChangeAuthor =(authorParam : string) => {
      setAuthor(authorParam)
    }

    const handleChangePubisher =(publisherParam : string) => {
      setPublisher(publisherParam)
    }
  
    return (
      <div className="h-full w-full flex flex-grow">
          <div className="w-3/12">
            <Params handleCategoryChange={handleChangeCategory} handleAuthorChange={handleChangeAuthor} handlePublisherChange={handleChangePubisher}></Params>
          </div>
          <div className="w=9/12">
            <ListSearchBook categoryPr={category} authorPr={author} publisherPr={publisher}></ListSearchBook>
          </div>
      </div>
    );
  };
  
  export default SearchBookPage;