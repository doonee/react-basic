import BlogList from "../components/BlogList";

const ListPage = ({ addToast }) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
      </div>
      <BlogList addToast={addToast} />
    </>
  );
};

export default ListPage;
