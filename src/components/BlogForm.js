import axios from "axios";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const BlogForm = ({ editing }) => {
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [body, setBody] = useState("");
  const [originalBody, setOriginalBody] = useState("");
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState(false);

  const isEdited = () => {
    return (
      title !== originalTitle ||
      body !== originalBody ||
      publish !== originalPublish
    );
  };

  const goBack = () => {
    if (editing) {
      history.push(`/blogs/${id}`);
    } else {
      history.push("/blogs");
    }
  };

  const onChangePublish = (e) => {
    setPublish(e.target.checked);
  };

  const handleSubmit = () => {
    if (editing) {
      axios
        .put(`http://localhost:3001/posts/${id}`, {
          title,
          body,
          publish,
        })
        .then(() => {
          history.push("/blogs");
        });
    } else {
      axios
        .post("http://localhost:3001/posts", {
          title,
          body,
          publish,
          createdAt: Date.now(),
        })
        .then((res) => {
          history.push("/admin");
        });
    }
  };

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
        setTitle(response.data.title);
        setOriginalTitle(response.data.title);
        setBody(response.data.body);
        setOriginalBody(response.data.body);
        setPublish(response.data.publish);
        setOriginalPublish(response.data.publish);
      });
    }
  }, [editing, id]);

  return (
    <>
      <h1>{editing ? "Edit" : "Create"} a Blog Post</h1>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Body
        </label>
        <textarea
          className="form-control"
          rows="10"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input mb-2"
          id="cb-publish"
          checked={publish || false}
          onChange={onChangePublish}
        />
        <label htmlFor="cb-publish" className="form-check-label">
          Publish
        </label>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>
      <button className="btn btn-danger ms-2" onClick={goBack}>
        Cancel
      </button>
    </>
  );
};

BlogForm.propTypes = {
  editing: propTypes.bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
