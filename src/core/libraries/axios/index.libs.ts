import config from "@/config/environment";
import Axios from "axios";

export const axios = Axios.create({
  baseURL: config.api.host,
  headers: {},
  timeout: 50000,
});
