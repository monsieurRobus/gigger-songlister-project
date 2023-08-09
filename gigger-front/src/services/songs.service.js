import { token } from "stylis";
import { APIuser } from "./serviceApiUser.config";

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