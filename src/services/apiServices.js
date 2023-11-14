import axios from "axios";
import { Toaster, toast } from "sonner";

axios.defaults.baseURL = "https://api.bookyourtiffin.com/api/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const getUserId = () => {
  const userId =
    typeof window !== "undefined" && localStorage.getItem("userId");
  return userId;
};

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
    const userId = getUserId();
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
    const userId = getUserId();
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
    const userId = getUserId();
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
      const { data } = await axios.get(`front/user/authorization`);
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

export const addCategory = (categoryData) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.post(`/cms/dropdown/category`, categoryData);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const getCategories = () => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.get(`/cms/dropdown/category/`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const deleteCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.delete(`/cms/dropdown/category/:${categoryId}`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
}

export const updateCategoryItem = (categoryData, categoryId) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.patch(`/cms/dropdown/category/${categoryId}`, categoryData);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
}