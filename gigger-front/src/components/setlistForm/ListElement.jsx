import React, { useEffect, useState } from 'react'
import { SongSelectedInListStyled } from '../../ui/SetlistFormElement'
import { secondsToMS } from '../../utils/swissknife'

const ListElement = (props) => {

    const {
        tagList,
        index,
        id,
        songlist} =props
    const [song,setSong] = useState({})

    useEffect(()=>{
        const songListed = songlist.find(song=>song._id === id)
        setSong(songListed)
    },[])


    const backgroundColors = (tags) => {

      const colourTag = []
      
      
      if(tags?.length && tags?.length>0)
      {
          if(tags.length == 1)
          {
              colourTag.push('#ffffff')
          }

          tags.forEach(tag=>{
              
              const selectedTag = tagList?.filter(tagElement => (tagElement._id == tag) ? colourTag.push(tagElement.color) : '')
          })
          // console.log(colourTag)
          return colourTag.join()
      }
      else 
      {
          return '#ff7d00,#ff007d'
      }

}

  return (
    <SongSelectedInListStyled gradientcolors={backgroundColors(song?.tags)}>
        <h3 className={"label"}>{index+1}</h3>
        <h3 className={"song-tag"}>{song?.name}</h3>
        <h4 className={"band-tag"}>{song?.artist}</h4>
        <h5 className={"duration"}>{secondsToMS(song?.duration)}</h5>
    </SongSelectedInListStyled>
  )
}

export default ListElement