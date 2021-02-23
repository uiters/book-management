//@ts-ignore
import { Formik, Form, Field } from "formik";
import bookApi from "../../../services/api/bookApi";

const NewBookPage = () => {
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          price: 100000,
          description: "",
          pages: 10,
          sku: "",
          authorName: "",
          publisherName: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
          bookApi.addNewBook({
            title: values.title,
            price: values.price,
            pages: values.pages,
            description: values.description,
            sku: values.sku,
            author: values.authorName,
            publisher: values.publisherName,
          }).then(response => {
              console.log(response);
          });
        }}
      >
        <Form className="border-8 flex flex-col">
          <label htmlFor="title">Title</label>
          <Field
            id="title"
            name="title"
            placeholder="Book Title Here!"
            type="text"
            className="focus: outline-none"
          ></Field>

          <label htmlFor="price">Price</label>
          <Field
            id="price"
            name="price"
            placeholder="Book price Here!"
            type="number"
            className="focus: outline-none"
          ></Field>
          <label htmlFor="description">Description</label>
          <Field
            id="description"
            name="description"
            placeholder="Book description Here!"
            type="text"
            className="focus: outline-none"
          ></Field>
          <label htmlFor="pages">Pages</label>
          <Field
            id="pages"
            name="pages"
            placeholder="Book Pages Here!"
            type="number"
            className="focus: outline-none"
          ></Field>
          <label htmlFor="sku">SKU</label>
          <Field
            id="sku"
            name="sku"
            placeholder="Book SKU Here!"
            type="text"
            className="focus: outline-none"
          ></Field>
          <label htmlFor="author-name">Author's Name</label>
          <Field
            id="author-name"
            name="author-name"
            placeholder="Author's Name Here!"
            type="text"
            className="focus: outline-none"
          ></Field>
          <label htmlFor="publisher-name">Publisher's Name</label>
          <Field
            id="publisher-name"
            name="publisher-name"
            placeholder="Author's Name Here!"
            type="text"
            className="focus: outline-none"
          ></Field>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewBookPage;
