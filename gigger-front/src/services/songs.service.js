import { token } from "../utils/token";
import { APIuser } from "./serviceApiUser.config";


export const addSong = async (formData) => {
  
  return APIuser.post("/songs/new", formData, {headers: {
    Authorization: `Bearer ${token()}`,
    }})
  .then((res) => res)
  .catch((err) => err)
}

export const favSong = async (formData) => {

  return APIuser.patch("/songs/favSong",formData,{headers: {
    Authorization: `Bearer ${token()}`,
    }})
    .then((res) => res)
  .catch((err) => err)

}

export const updateSong = async (formData,id)=> {
  return APIuser.patch(`/songs/update?id=${id}`, formData,    {headers: {
    Authorization: `Bearer ${token()}`,
    }})
    .then((res) => res)
    .catch((error) => error);
}

export const getSongById = async (id) => {
    return APIuser.get(`/songs/${id}`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllSongs = async (id) => {
    return APIuser.get(`/songs`, token())
    .then((res) => res)
    .catch((err) => err)
  }
  export const getAllSongsPaginated = async (page) => {
    return APIuser.get(`/songs/page/${page}`, token())
    .then((res) => res)
    .catch((err) => err)
  }

  export const getFilteredSongsPaginated = async(page,filters) => {
    return APIuser.post(`/songs/filtered/${page}`, filters,{headers: {
      Authorization: `Bearer ${token()}`,
      }})
    .then((res) => res)
    .catch((err) => err)
  }
  export const deleteSong = async (id) => {
    return APIuser.delete(`/songs/delete?id=${id}`, {headers: {
      Authorization: `Bearer ${token()}`,
      }})
    .then((res) => res)
    .catch((err) => err)
  }
  