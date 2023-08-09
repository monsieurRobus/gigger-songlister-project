import { token } from "../utils/token";
import { APIuser } from "./serviceApiUser.config";

export const getEventById = async (id) => {
    return APIuser.get(`/user/${id}`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllEvents = async (id) => {
    return APIuser.get(`/user`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllEventsPaginated = async (page) => {
    return APIuser.get(`/events/page/${page}`, token())
    .then((res) => res)
    .catch((err) => err)
  }