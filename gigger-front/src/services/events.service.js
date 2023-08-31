import { token } from "../utils/token";
import { APIuser } from "./serviceApiUser.config";

export const getEventById = async (id) => {
    return APIuser.get(`/events/${id}`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllEvents = async () => {
    return APIuser.get(`/events`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllEventsPaginated = async (page) => {
    return APIuser.get(`/events/page/${page}`, token())
    .then((res) => res)
    .catch((err) => err)
  }

  export const addNewEvent = async (formData) => {
    return APIuser.post("/events/new", formData, {headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "multipart/form-data"
      }})
    .then((res) => res)
    .catch((err) => err)
  }

  export const updateEvent = async (formData,id)=> {
    return APIuser.patch(`/events/update?id=${id}`, formData,    {headers: {
      Authorization: `Bearer ${token()}`
      }})
      .then((res) => res)
      .catch((error) => error);
  }

  export const deleteEvent = async (id) => {
    return APIuser.delete(`/events/delete?id=${id}`, {headers: {
      Authorization: `Bearer ${token()}`,
      }})
    .then((res) => res)
    .catch((err) => err)
  }