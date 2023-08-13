import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/AuthContext'
import { addSong } from '../../services/songs.service'


const SongForm = (props) => {
  const [res,setRes] = useState({})
  const {songs,setSongs} = props
  const [send,setSend] =useState(false)
  const [ok,setOk] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const {user, logout} = useAuth()

  const handleAddSong = async (formData) => {

    const valuesToSend = {
        name: formData.name,
        artist: formData.artist,
        duration: formData.duration,
        lyrics: formData.lyrics,
        notes: formData.notes,
        user: user._id
    }

    setSend(true)
    setRes(await addSong(valuesToSend))
    setSend(false)
    
}

useEffect(()=>{

    // useTagsError(res,setOk,setRes,logout)
    
    res?.data?.song ? setSongs([...songs,res?.data?.song]) :null

},[res])

  return (
    <div>
        {user.role==="admin"? <form onSubmit={handleSubmit(handleAddSong)}>
            <label>Song Name</label><input type="text" name="song-name" {...register("name")}/>
            <label>Artist</label><input type="text" name="artist-name" {...register("artist")}/>
            <label>Durationr</label><input type="number" name="duration" {...register("duration")}/>
            <label>Lyrics</label><input type="text" name="lyrics" {...register("lyrics")}/>
            <label>Notes</label><input type="text" name="notes" {...register("notes")}/>
            <input type="submit" />
        </form>: null}
    </div>
  )
}

export default SongForm