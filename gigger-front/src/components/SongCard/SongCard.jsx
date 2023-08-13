import React from 'react'
import './SongCard.css'
const SongCard = (props) => {
    const {song} = props
    const {name,artist,duration,lyrics,notes,tags} = song
  return (
    <figure className={'song-card'}>
        <h2>{name}</h2>
        <h3>´{artist}</h3>
        <h4>{duration}</h4>
        <p>{lyrics}</p>
        <p>{notes}</p>
    </figure>
  )
}

export default SongCard