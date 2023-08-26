import React, { useEffect, useState } from 'react'
import { SongCardStyled, BackgroundStyled, SpeechSongBubbleStyled } from '../../ui/SongCardElements'
import './SongCard.css'
import { getTagById } from '../../services/tags.service'
import { deleteSong, favSong } from '../../services/songs.service'
import { useAuth } from '../../hooks/AuthContext'
import Swal from 'sweetalert2'

const SongCard = (props) => {
    const {song,tagList,res,setRes} = props
    const {name,artist,duration,lyrics,notes,tags,_id,setlists} = song
    const songOwner = song.user
    const [favourited,setFavourited] = useState(false)
    const [resFav,setResFav] = useState({})
    const [send,setSend] = useState(false)
    const {user,logout} = useAuth()
    console.log()
    const favUnfav = async() => {

        const valuesToSend = {
            songId: song._id
        }

        setSend(true)
        setResFav(await favSong(valuesToSend))
        setSend(false)
    }

    const executeDelete = async() => {
        setRes(await deleteSong(_id))
    }
    const backgroundColors = (tags) => {

        const colourTag = []
        
        
        if(tags.length && tags.length>0)
        {
            if(tags.length == 1)
            {
                colourTag.push('#ffffff')
            }

            tags.forEach(tag=>{
                
                const selectedTag = tagList?.filter(tagElement => (tagElement._id == tag) ? colourTag.push(tagElement.color) : '')
            })

            return colourTag.join()
        }
        else 
        {
            return '#ff7d00,#ff007d'
        }

}

const deleteSongQuestion = () => {


    const checkSetlist = async() => {

        if (setlists.length > 0){

        Swal.fire({
            title: 'This song has seltists associated.',
            text: "If you proceed, it will be deleted from setlists",
            icon: 'info',
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true,
            cancelButtonText: 'No, keep it',
          
          }).then(async result => 
      
            result.isConfirmed ? executeDelete()  : console.log("do not delete song")
            
          )

        }
        else {
            executeDelete()
        }


    }


    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true,
        cancelButtonText: 'No, keep it',
      
      }).then(async result => 
  
        result.isConfirmed ? checkSetlist() : console.log("do not delete song")
        
      )
}


useEffect(()=>{
    if(resFav.data?.message?.includes("song faved"))
        setFavourited(true)
    else
        setFavourited(false)
},[resFav])

useEffect(
    ()=>{
        song.favouritedBy == user._id ? setFavourited(true) : setFavourited(false)
    },[])

  return (
    <SongCardStyled className={'song-card'}>
        <BackgroundStyled gradientcolors={backgroundColors(tags)} className={'background'} />
        <div className={'song-card-content'}>
            <div>
                <h2>{name}</h2>
                <h3>{artist}</h3>
            </div>
            <div>
            {favourited ? <button onClick={favUnfav}>💗</button> : <button onClick={favUnfav}>🖤</button> }
            <button onClick={deleteSongQuestion} disabled={user._id !== songOwner}>🗑️</button>
            </div>
            
        </div>
        <SpeechSongBubbleStyled>
            <h4>{duration}</h4>    
            <p>{notes}</p>
        </SpeechSongBubbleStyled>
    </SongCardStyled>
  )
}

export default SongCard