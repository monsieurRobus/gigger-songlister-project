import React from 'react'
import { SongCardStyled, BackgroundStyled, SpeechSongBubbleStyled } from '../../ui/SongCardElements'
import './SongCard.css'
import { getTagById } from '../../services/tags.service'
const SongCard = (props) => {
    const {song,tagList} = props
    const {name,artist,duration,lyrics,notes,tags} = song


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

  return (
    <SongCardStyled className={'song-card'}>
        <BackgroundStyled gradientcolors={backgroundColors(tags)} className={'background'} />
        <div className={'song-card-content'}>
            <h2>{name}</h2>
            <h3>{artist}</h3>
            <p>{lyrics}</p>
        </div>
        <SpeechSongBubbleStyled>
            <h4>{duration}</h4>    
            <p>{notes}</p>
        </SpeechSongBubbleStyled>
    </SongCardStyled>
  )
}

export default SongCard