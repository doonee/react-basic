import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ShowPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPost = useCallback(() => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const printDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date?.toLocaleString();
  };

  useEffect(() => {
    getPost(id);
  }, [id, getPost]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <div className="d-flex">
        <h1 className="flex-grow-1">{post?.title}</h1>
        {isLoggedIn && (
          <div>
            <Link to={`/blogs/${post?.id}/edit`} className="btn btn-primary">
              Edit
            </Link>
          </div>
        )}
      </div>
      <small className="text-muted">
        Created At : {printDate(post?.createdAt)}
      </small>
      <hr />
      <p>{post?.body}</p>
    </>
  );
};

export default ShowPage;
