import axios from "axios";

export default function externalApi(baseURL: string) {
  const defaultOptions = {
    baseURL,
  };

  return axios.create(defaultOptions);
}
