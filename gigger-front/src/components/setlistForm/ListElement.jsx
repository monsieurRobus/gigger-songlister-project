import React, { useEffect, useState } from 'react'
import { SongSelectedInListStyled } from '../../ui/SetlistFormElement'

const ListElement = (props) => {

    const {
        index,
        id,
        songlist} =props
    const [song,setSong] = useState({})

    useEffect(()=>{
        const songListed = songlist.find(song=>song._id === id)
        setSong(songListed)
    },[])

  return (
    <SongSelectedInListStyled>
        <h3>{index+1}</h3>
        <h3>{song?.name}</h3>
        <h4>{song?.artist}</h4>
        <h5>{song?.duration}</h5>
    </SongSelectedInListStyled>
  )
}

export default ListElement