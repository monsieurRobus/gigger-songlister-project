import React, { useState } from 'react'
import { SongCardStyled, BackgroundStyled, SpeechSongBubbleStyled } from '../../ui/SongCardElements'
import './SongCard.css'
import { getTagById } from '../../services/tags.service'
const SongCard = (props) => {
    const {song,tagList} = props
    const {name,artist,duration,lyrics,notes,tags} = song
    const [favourited,setFavourited] = useState(false)
    const favUnfav = () => {

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