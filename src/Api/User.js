import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = `${process.env.REACT_APP_API_URL}`;

export const SignUpApi = (data) => {
  try {
    const response = axios.post(`${baseUrl}/api/signup`, data);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const loginApi = (data) => {
  try {
    const response = axios.post(`${baseUrl}/api/login`, data, {
      withCredentials: true,
      method: "POST",
    });
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getProfileApi = (userId) => {
  try {
    const response = axios.post(`${baseUrl}/api/profile/${userId}`, {
      withCredentials: true,
      method: "POST",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
