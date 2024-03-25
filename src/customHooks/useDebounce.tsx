import { useRef } from "react";
import _ from "lodash"; // Assuming you installed Lodash

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  time = 500
) => {
  return useRef(_.debounce(callback, time)).current;
};
