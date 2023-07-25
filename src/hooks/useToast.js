import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addToast as add, removeToast } from "../store/toastSlice";

const useToast = () => {
  //const toasts = useRef([]); // useRef는 useState와 다르게 리렌더링이 되지 않는다. 즉시 업데이트 되어야 하는 값이 있을 때 사용한다.
  const dispatch = useDispatch();
  //const [, setToastRerender] = useState(false); // 사용하지 않는 값은 공백으로 설정한다. 콤마는 꼭 해줘야 함!

  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = { ...toast, id };

    dispatch(add(toastWithId));

    setTimeout(() => {
      deleteToast(id);
    }, 5000);
  };

  const deleteToast = (id) => {
    dispatch(removeToast(id));
  };

  return { addToast, deleteToast };
};

export default useToast;
