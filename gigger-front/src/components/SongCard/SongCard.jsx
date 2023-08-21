import React, { useEffect, useState } from 'react'
import { SongCardStyled, BackgroundStyled, SpeechSongBubbleStyled } from '../../ui/SongCardElements'
import './SongCard.css'
import { getTagById } from '../../services/tags.service'
import { favSong } from '../../services/songs.service'
import { useAuth } from '../../hooks/AuthContext'
const SongCard = (props) => {
    const {song,tagList} = props
    const {name,artist,duration,lyrics,notes,tags,_id} = song
    const [favourited,setFavourited] = useState(false)
    const [res,setRes] = useState({})
    const [send,setSend] = useState(false)
    const {user} = useAuth()

    const favUnfav = async() => {

        const valuesToSend = {
            songId: song._id
        }

        setSend(true)
        setRes(await favSong(valuesToSend))
        setSend(false)
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

useEffect(()=>{
    if(res.data?.message?.includes("song faved"))
        setFavourited(true)
    else
        setFavourited(false)
},[res])

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
            {favourited ? <button onClick={favUnfav}>Dislike</button> : <button onClick={favUnfav}>Like</button> }
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