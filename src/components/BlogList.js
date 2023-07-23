import axios from "axios";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogList = ({ isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPosts(response.data);
      setIsLoading(false);
    });
  };

  const deleteBlog = (e, postId) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${postId}`).then(() => {
      setPosts((previousPosts) => previousPosts.filter((p) => p.id !== postId));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (posts?.length === 0) {
    return <div>No blog post found</div>;
  }

  return posts
    ?.filter((post) => isAdmin || post.publish)
    ?.map((post) => (
      <Card
        key={post.id}
        title={post.title}
        onClick={() => {
          history.push(`/blogs/${post.id}`);
        }}
      >
        {isAdmin && (
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>
        )}
      </Card>
    ));
};

BlogList.propTypes = {
  isAdmin: propTypes.bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
