import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { SetlistBackgroundStyled, SetlistBandBackgroundStyled, SetlistCardStyled } from '../../ui/SetlistCardElement'

const SetlistCard = (props) => {
    const {name,description,favouritedBy,songs,songList} = props
    const {user} = useAuth()
    const [favourited,setFavourited] = useState(false)

    const favUnfav = () => {
        setFavourited(!favourited)

        console.log(favourited)

    }

    useEffect(()=>(
        setFavourited(favouritedBy?.find(fav=>fav === user._id) ? true : false)
    ),[favouritedBy])

  return (
    <SetlistCardStyled>
        <SetlistBackgroundStyled>
            {
                songs && songs.map(song => <SetlistBandBackgroundStyled key={song}>{songList.find(songOriginal=> songOriginal._id === song).name}</SetlistBandBackgroundStyled>)
            }   
        </SetlistBackgroundStyled>
        <h1>{name}</h1>
        <h2>{description}</h2>
        {favourited ? <button onClick={favUnfav}>Dislike</button> : <button onClick={favUnfav}>Like</button> }
    </SetlistCardStyled>
  )
}

export default SetlistCard