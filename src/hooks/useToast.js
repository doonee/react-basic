import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useToast = () => {
  const toasts = useRef([]); // useRef는 useState와 다르게 리렌더링이 되지 않는다. 즉시 업데이트 되어야 하는 값이 있을 때 사용한다.

  const [, setToastRerender] = useState(false); // 사용하지 않는 값은 공백으로 설정한다. 콤마는 꼭 해줘야 함!

  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = { ...toast, id };
    toasts.current = [...toasts.current, toastWithId];
    setToastRerender((prev) => !prev);
    setTimeout(() => {
      deleteToast(id);
    }, 5000);
  };

  const deleteToast = (id) => {
    toasts.current = toasts.current.filter((t) => t.id !== id);
    setToastRerender((prev) => !prev);
  };

  return [toasts.current, addToast, deleteToast];
};

export default useToast;
