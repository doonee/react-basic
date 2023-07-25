import propTypes from "prop-types";

const Toast = ({ toasts, deleteToast }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      {toasts?.map((toast) => (
        <div
          key={toast.id}
          className={`cursor-pointer alert alert-${
            toast.type || "success"
          } m-0 py-2 mt-2`}
          onClick={() => deleteToast(toast.id)}
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
};

Toast.propTypes = {
  toasts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      text: propTypes.string.isRequired,
      type: propTypes.string,
    })
  ),
  deleteToast: propTypes.func.isRequired,
};

Toast.defaultProps = {
  toasts: [],
};

export default Toast;
