import axios from "axios";

export const getAllProducts = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3001/api/v1/products",
      // url: "/api/v1/products",
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const signUp = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:3001/api/v1/users/signUp",
      // url: "/api/v1/users/signUp",
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const signIn = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:3001/api/v1/users/login",
      // url: "/api/v1/users/login",
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
export const forgotPassword = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3001/api/v1/users/forgotPassword",
      // url: "/api/v1/users/forgotPassword",
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const resetPassword = async (data, token) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:3001/api/v1/users/resetPassword/${token}`,
      // url: `/api/v1/users/resetPassword/${token}`,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const signOut = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3001/api/v1/users/logout",
      // url: "/api/v1/users/logout",
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateMe = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3001/api/v1/users/updateMe",
      // url: "/api/v1/users/updateMe",
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateMyPassword = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3001/api/v1/users/updatePassword",
      // url: "/api/v1/users/updatePassword",
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getOneProduct = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://127.0.0.1:3001/api/v1/products/${id}`,
      // url: `/api/v1/products/${id}`,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:3001/api/v1/products/${id}`,
      // url: `/api/v1/products/${id}`,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const createProduct = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `http://127.0.0.1:3001/api/v1/products`,
      // url: `/api/v1/products`,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getProducts = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://127.0.0.1:3001/api/v1/products`,
      // url: `/api/v1/products`,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateProduct = async (data, id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:3001/api/v1/products/${id}`,
      // url: `/api/v1/products/${id}`,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const createReviewOnProduct = async (data, id, jwt) => {
  try {
    const res = await axios({
      method: "POST",
      url: `http://127.0.0.1:3001/api/v1/products/${id}/reviews`,
      // url: `/api/v1/products/${id}/reviews`,
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getOrder = async (id, jwt) => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://127.0.0.1:3001/api/v1/orders/${id}`,
      // url: `/api/v1/orders/${id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getUser = async (jwt) => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://127.0.0.1:3001/api/v1/users/me`,
      // url: `/api/v1/users/me`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const checkoutSession = async (data, jwt) => {
  try {
    const res = await axios({
      method: "POST",
      url: `http://127.0.0.1:3001/api/v1/payments/checkout-session`,
      // url: `/api/v1/payments/checkout-session`,
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
