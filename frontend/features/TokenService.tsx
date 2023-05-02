// Redux 관련
import { RootState } from "@/store/configureStore";
import { useSelector } from "react-redux";

export default function userInfo() {
  return useSelector((state: RootState) => state.auth);
}
