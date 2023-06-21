import { useContext } from "react";
import ReclamosContext from "../context/ReclamosProvider";

const useReclamos = () => {
  return useContext(ReclamosContext);
};

export default useReclamos;
