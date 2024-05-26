
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface IReturnData {
  ref: MutableRefObject<any>
  isShow: boolean;
  setIsShow: (value: boolean) => void;
}

export const useOutside = (initialOpen: boolean): IReturnData => {
  const [isShow, setIsShow] = useState(initialOpen);
  const ref = useRef<HTMLElement>(null);


  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return { ref, isShow, setIsShow };
}