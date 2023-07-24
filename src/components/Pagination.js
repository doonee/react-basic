import propTypes from "prop-types";

const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
  const currentSet = Math.ceil(currentPage / limit); // 현재 페이지가 몇번째 set인지
  const lastSet = Math.ceil(numberOfPages / limit); // 마지막 세트 번호
  const startPage = limit * (currentSet - 1) + 1; // 현재 세트의 시작 페이지
  const numberOfPageForSet =
    currentSet === lastSet
      ? numberOfPages % limit === 0
        ? limit
        : numberOfPages % limit
      : limit; // 현재 세트에서 보여줄 페이지 수
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {currentSet !== 1 && (
          <li className="page-item">
            <div
              className="page-link cursor-pointer"
              onClick={() => onClick(startPage - limit)}
            >
              Previous
            </div>
          </li>
        )}
        {Array(numberOfPageForSet)
          .fill(startPage)
          .map(
            (value, index) => value + index
          ) /* 배열을 생성해서 index로 배열값 만들기 */
          .map((pageNumber) => {
            return (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                } `}
              >
                <div
                  className="page-link cursor-pointer"
                  onClick={() => {
                    onClick(pageNumber);
                  }}
                >
                  {pageNumber}
                </div>
              </li>
            );
          })}
        {currentSet !== lastSet && (
          <li className="page-item">
            <div
              className="page-link cursor-pointer"
              onClick={() => onClick(startPage + limit)}
            >
              Next
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: propTypes.number,
  numberOfPages: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
  limit: propTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  limit: 3,
};

export default Pagination;
