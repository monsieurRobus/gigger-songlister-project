import { token } from "../utils/token";
import { APIuser } from "./serviceApiUser.config";

export const addSetlist = async (formData) => {
  
  return APIuser.post("/setlist/new", formData, {headers: {
    Authorization: `Bearer ${token()}`,
    }})
  .then((res) => res)
  .catch((err) => err)
}

export const favSetlist = async (formData) => {

  return APIuser.patch("/setlist/favsetlist",formData,{headers: {
    Authorization: `Bearer ${token()}`,
    }})
    .then((res) => res)
  .catch((err) => err)

}

export const getSetlistById = async (id) => {
    return APIuser.get(`/setlist/${id}`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllSetlists = async (id) => {
    return APIuser.get(`/setlist`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllSetlistsPaginated = async (page) => {
    return APIuser.get(`/setlist/page/${page}`, token())
    .then((res) => res)
    .catch((err) => err)
  }

  export const deleteSetlist = async (id) => {
    return APIuser.delete(`/setlist/delete?id=${id}`, {headers: {
      Authorization: `Bearer ${token()}`,
      }})
    .then((res) => res)
    .catch((err) => err)
  }
  