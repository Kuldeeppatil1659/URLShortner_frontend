import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = `${process.env.REACT_APP_API_URL}`;
export const sendLinkBackend = async ({ link, payload }) => {
  try {
    const response = axios.post(`${baseUrl}/api/url/shortener`, {
      link,
      payload,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message);
  }
};

export const sendQrCodeLinksBackend = async ({ link, payload }) => {
  try {
    const response = axios.post(
      `${baseUrl}/api/url/shortener/qr`,
      { link, payload },
      {
        method: "POST",
        withCredentials: true,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const fetchLinks = async ({ userId }) => {
  try {
    const response = axios.get(
      `${baseUrl}/api/url/shortener/${userId}`,

      {
        method: "GET",
        withCredentials: true, // Ensures cookies are sent
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message);
  }
};

export const fetchQrCodes = ({ userId }) => {
  try {
    const response = axios.get(`${baseUrl}/api/url/shortener/qr/${userId}`, {
      method: "GET",
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message);
  }
};
