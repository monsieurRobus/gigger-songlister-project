
import { token } from "../utils/token";
import { APIuser } from "./serviceApiUser.config";


export const addTag = async (formData) => {
  return APIuser.post("/tags/new", formData, {headers: {
    Authorization: `Bearer ${token()}`,
    }})
  .then((res) => res)
  .catch((err) => err)
}

export const getTagById = async (id) => {
    return APIuser.get(`/tags/${id}`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllTags = async (id) => {
    return APIuser.get(`/tags`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllTagsPaginated = async (page) => {
    return APIuser.get(`/tags/page/${page}`, token())
    .then((res) => res)
    .catch((err) => err)
  }