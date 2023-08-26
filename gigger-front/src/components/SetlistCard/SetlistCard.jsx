import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { SetlistBackgroundStyled, SetlistBandBackgroundStyled, SetlistCardStyled } from '../../ui/SetlistCardElement'
import { deleteSetlist, favSetlist } from '../../services/setlists.service'
import Swal from 'sweetalert2'

const SetlistCard = (props) => {
    const {name,description,favouritedBy,songs,songList,id,setlistOwner,res,setRes} = props
    const {user} = useAuth()
    const [favourited,setFavourited] = useState(false)
    const [send,setSend] = useState(false)

    const favUnfav = async() => {

        const valuesToSend = {
            setlistId: id
        }

        setSend(true)
        setRes(await favSetlist(valuesToSend))
        setSend(false)
    }

    useEffect(()=>{
        if(res?.data?.message?.includes("setlist faved") && (res?.data?.setlist === id))
            setFavourited(true)
        
        if(res?.data?.message?.includes("setlist unfav") && (res?.data?.setlist === id))
            setFavourited(false)

    },[res])
    
    useEffect(()=>{

       
                favouritedBy == user._id ? setFavourited(true) : setFavourited(false)
           


    },[])

    const deleteSetlistQuestion = () => {


        const executeDelete = async() => {
            setRes(await deleteSetlist(id))
        }
    
    
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true,
            cancelButtonText: 'No, keep it',
          
          }).then(async result => 
      
            result.isConfirmed ? executeDelete() : console.log("do not delete song")
            
          )
    }

  return (
    <SetlistCardStyled>
        <SetlistBackgroundStyled>
            {
                songs && songs?.map(song => <SetlistBandBackgroundStyled key={song}>{songList?.find(songOriginal=> songOriginal._id === song.name)}</SetlistBandBackgroundStyled>)
            }   
        </SetlistBackgroundStyled>
        <h1>{name}</h1>
        <h2>{description}</h2>
        <div>{favourited ? <button onClick={favUnfav}>💗</button> : <button onClick={favUnfav}>🖤</button> }<button onClick={deleteSetlistQuestion} disabled={user._id !== setlistOwner}>🗑️</button></div>
    </SetlistCardStyled>
  )
}

export default SetlistCard