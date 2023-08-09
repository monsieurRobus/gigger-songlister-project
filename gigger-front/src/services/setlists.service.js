import { token } from "stylis";
import { APIuser } from "./serviceApiUser.config";

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