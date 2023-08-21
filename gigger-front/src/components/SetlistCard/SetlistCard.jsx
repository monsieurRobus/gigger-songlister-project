import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { SetlistBackgroundStyled, SetlistBandBackgroundStyled, SetlistCardStyled } from '../../ui/SetlistCardElement'
import { favSetlist } from '../../services/setlists.service'

const SetlistCard = (props) => {
    const {name,description,favouritedBy,songs,songList,id} = props
    const {user} = useAuth()
    const [favourited,setFavourited] = useState(false)
    const [send,setSend] = useState(false)
    const [res,setRes] = useState({})

    const favUnfav = async() => {

        const valuesToSend = {
            setlistId: id
        }

        setSend(true)
        setRes(await favSetlist(valuesToSend))
        setSend(false)
    }

    useEffect(()=>{
        if(res.data?.message?.includes("setlist faved"))
            setFavourited(true)
        else
            setFavourited(false)
    },[res])
    
    useEffect(()=>{

       
                favouritedBy == user._id ? setFavourited(true) : setFavourited(false)
           


    },[])

   

  return (
    <SetlistCardStyled>
        <SetlistBackgroundStyled>
            {
                songs && songs.map(song => <SetlistBandBackgroundStyled key={song}>{songList.find(songOriginal=> songOriginal._id === song.name)}</SetlistBandBackgroundStyled>)
            }   
        </SetlistBackgroundStyled>
        <h1>{name}</h1>
        <h2>{description}</h2>
        {favourited ? <button onClick={favUnfav}>Dislike</button> : <button onClick={favUnfav}>Like</button> }
    </SetlistCardStyled>
  )
}

export default SetlistCard