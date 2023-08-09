import { token } from "stylis";
import { APIuser } from "./serviceApiUser.config";

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