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
  console.log(categoryData, "category");
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.post(
        `/cms/dropdown/category`,
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
      const { data } = await axios.delete(
        `/cms/dropdown/category/${categoryId}`
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

export const updateCategoryItem = (categoryData, categoryId) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.patch(
        `/cms/dropdown/category/${categoryId}`,
        categoryData
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

// -------meal apis--------
export const createMealItem = (mealData) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.post(`/cms/meal`, mealData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const getMealList = (mealType) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    const url = `/cms/meal/?meal=${mealType}&pageSize=${500}`;
    const url2 = `/cms/meal/?pageSize=${100}`;
    try {
      const { data } = await axios.get(mealType ? url : url2);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const deleteMeal = (mealSlug) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.delete(`/cms/meal/${mealSlug}`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const editMealItem = (mealData, slug) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.patch(`/cms/meal/${slug}`, mealData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const getSingleMeal = (slug) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.get(`/cms/meal/${slug}`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

// --------subscription apis--------
export const subscription = (subscription) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.post(`/cms/subscription`, subscription, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const getAllSubscriptions = (mealType) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    const url = `/cms/subscription/?meal=${mealType}&pageSize=${500}`;
    const url2 = `/cms/subscription/`;
    try {
      const { data } = await axios.get(mealType ? url : url2);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const editSubscriptionData = (subscription, slug) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.patch(
        `/cms/subscription/${slug}`,
        subscription,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

export const deleteSubscription = (slug) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.delete(`/cms/subscription/${slug}`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const singleSubscription = (slug) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.get(`/cms/subscription/${slug}`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

// --------------cart apis--------------

export const addCartItem = (item) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.post(`/front/user/cart`, item);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const getCartItems = () => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.get(`/front/user/cart`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const updateCartItem = (item, cartId) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.put(`/front/user/cart/${cartId}`, item);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};

export const deleteCartItem = (cartId) => {
  return new Promise(async (resolve, reject) => {
    updateAccessToken();
    try {
      const { data } = await axios.delete(`/front/user/cart/${cartId}`);
      if (data.status == 0) throw data;
      else {
        resolve(data);
      }
    } catch (data) {
      reject(data.message);
    }
  });
};