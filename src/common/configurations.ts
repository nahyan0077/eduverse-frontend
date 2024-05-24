import { AxiosRequestConfig } from "axios";

export const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  
  export const appJson: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json"
    }
  };
  
  export const configMultiPart = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };