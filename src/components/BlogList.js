import axios from "axios";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import useToast from "../hooks/useToast";
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  const { addToast } = useToast();
  const location = useLocation();
  /* 
  {
    "pathname": "/admin",
    "search": "?page=1",
    "hash": "",
    "key": "hmbnvt"
    } 
  */
  const params = new URLSearchParams(location.search);
  const pageParam = params.get("page");
  /* 
    "?page=1" => params.get("page") => 1
  */
  const history = useHistory();
  const limit = 3;
  const toasts = useSelector((state) => state.toast.toasts);
  console.log("🚀 ~ file: BlogList.js:29 ~ BlogList ~ toasts:", toasts);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Math.ceil() : 소수점 올림
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts]);

  // useCallback:
  // useEffect 나 useCallback 으로 감싸주지 않으면 계속해서 같은 함수를 새롭게 생성한다.
  // 함수를 캐싱해서 재사용, 무한루프 방지
  const getPosts = (page = 1) => {
    /** title_like: title의 일부분만 일치해도 검색이 되도록 하는 옵션 */
    const params = {
      _page: page,
      _limit: limit,
      _sort: "id",
      _order: "desc",
      title_like: searchText,
    };
    if (!isAdmin) {
      params.publish = true; // json.webserver의 where 조건 추가, 학습필요X
    }
    axios.get("http://localhost:3001/posts", { params }).then((response) => {
      setNumberOfPosts(response.headers["x-total-count"]);
      setPosts(response.data);
      setIsLoading(false);
    });
  };

  const onClickPageButton = (page) => {
    // 기록해서 백버튼 누르면 바로 전 리스트 페이지로 돌아가기 위함.
    // location.pathname 앞에 / 사용하면 에러남.
    history.push(`${location.pathname}?page=${page}`);
    setCurrentPage(page);
    getPosts(page);
  };

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  const deleteBlog = (e, postId) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${postId}`).then(() => {
      //   setPosts((previousPosts) => previousPosts.filter((p) => p.id !== postId));
      getPosts(currentPage);
      setIsLoading(false);
      addToast({ text: "Blog post deleted", type: "success" });
    });
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`${location.pathname}?page=1`);
      setCurrentPage(1);
      getPosts(1);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderPosts = () => {
    return posts?.map((post) => (
      <Card
        key={post.id}
        title={post.title}
        onClick={() => {
          history.push(`/blogs/${post.id}`);
        }}
      >
        {isAdmin ? (
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>
        ) : null}
      </Card>
    ));
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyUp={onSearch}
      />
      <hr />
      {posts?.length === 0 ? (
        <div>No blog post found</div>
      ) : (
        <>
          {renderPosts()}
          {numberOfPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              onClick={onClickPageButton}
            />
          )}
        </>
      )}
    </div>
  );
};

BlogList.propTypes = {
  isAdmin: propTypes.bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
