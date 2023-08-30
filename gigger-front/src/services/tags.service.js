
import { token } from "../utils/token";
import { APIuser } from "./serviceApiUser.config";


export const addTag = async (formData) => {
  
  return APIuser.post("/tags/new", formData, {headers: {
    Authorization: `Bearer ${token()}`,
    }})
  .then((res) => res)
  .catch((err) => err)
}

export const deleteTag = async (id) => {
  return APIuser.delete(`/tags/delete?id=${id}`, {headers: {
    Authorization: `Bearer ${token()}`,
    }})
  .then((res) => res)
  .catch((err) => err)
}

export const getTagById = async (id) => {
    return APIuser.get(`/tags/${id}`, {headers: {
      Authorization: `Bearer ${token()}`,
      }})
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

  export const updateTag = async (formData,id)=> {
    console.log(formData)
    return APIuser.patch(`/tags/update?id=${id}`, formData,    {headers: {
      Authorization: `Bearer ${token()}`
      }})
      .then((res) => res)
      .catch((error) => error);
  }