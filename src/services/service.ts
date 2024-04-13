import axios from "axios";
import { base_url } from "./config";
import Cookies from "js-cookie";

const makeRequest = async (
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  endPoint: string,
  data: object | null,
  authorization: boolean
) => {
  try {
    let headers = {};
    // If need authorization and token not found then return with error
    if (authorization && !Cookies.get("access_token"))
      throw new Error("No token found.");

    // If need authorization then send the token in headers
    if (authorization)
      headers = {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
        "Cache-Control": "no-cache",
      };

    return await axios({
      url: base_url + endPoint,
      method,
      data,
      headers: {
        ...headers,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET
export const getService = async (
  endPoint: string,
  authorization: boolean = false
) => makeRequest("GET", endPoint, null, authorization);

// POST
export const postService = async (
  endPoint: string,
  reqest: object | null,
  authorization: boolean = false
) => makeRequest("POST", endPoint, reqest, authorization);

// PUT
export const putService = async (
  endPoint: string,
  reqest: object,
  authorization: boolean = false
) => makeRequest("PUT", endPoint, reqest, authorization);

// PATCH
export const patchService = async (
  endPoint: string,
  reqest: object,
  authorization: boolean = false
) => makeRequest("PATCH", endPoint, reqest, authorization);

// DELETE
export const deleteService = async (
  endPoint: string,
  authorization: boolean = false
) => makeRequest("DELETE", endPoint, null, authorization);
