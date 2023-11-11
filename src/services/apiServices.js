import axios from "axios";
import { Toaster, toast } from "sonner";

axios.defaults.baseURL = "http://api.bookyourtiffin.com/api/";
// axios.defaults.headers.common["Authorization"] =
//   typeof window !== "undefined" && localStorage.getItem("accessToken");
axios.defaults.headers.post["Content-Type"] = "application/json";

const userId = typeof window !== "undefined" && localStorage.getItem("userId");

const updateAccessToken = () => {
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  if (accessToken) {
    axios.defaults.headers.common["auth-token"] = accessToken;
  }
};

export const userLogin = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`front/user/signin`, userData);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const userVerify = (userOtp) => {
  return new Promise(async (resolve, reject) => {
    console.log("---user id---", userId);
    try {
      const { data } = await axios.post(`front/user/verify/${userId}`, userOtp);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const resendOTP = () => {
  return new Promise(async (resolve, reject) => {
    console.log("---user id---", userId);
    try {
      const { data } = await axios.get(`front/user/resend/${userId}`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const profileUpdate = (userData) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.patch(
        `front/user/profile/${userId}`,
        userData
      );
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const authorization = () => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.get(
        `front/user/authorization`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const adminLogin = (adminData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`/cms/auth/signin`, adminData);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};
