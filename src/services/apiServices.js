import axios from "axios";
import { Toaster, toast } from "sonner";

axios.defaults.baseURL = "https://api.bookyourtiffin.com/api/front";

export const userLogin = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`/user/signin`, userData);
      if (data.status == 0) throw data;
      else {
        console.log('---data---', data);
        setShowOtpBox(1);
        setMyOtpToken(data.otp);
        resolve(data.message);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const verifyOTP = (userData) => {

}