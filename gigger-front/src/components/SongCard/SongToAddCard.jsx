import React, { useEffect, useState } from 'react'
import { SongToSelectStyled } from '../../ui/SetlistFormElement'

const SongToAddCard = (props) => {
    const { 
        id,
        name, 
        artist,
        currentSetlist, 
        tags, 
        setCurrentSetlist,
        alreadySelected, 
        tagList,
        index
    } = props
    const [selected,setSelected] = useState(alreadySelected)


    useEffect(()=>{

        if(currentSetlist.length==0)
            setSelected(false)

    }, [currentSetlist])

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

    const addSong = () => {
        
        const songFound = currentSetlist.find(song=>song === id)
        if(!songFound) {
            setCurrentSetlist([...currentSetlist,id])
        }

    }

    const deleteSong = () => {

        const songFound = currentSetlist.find(song=>song===id)
        if(songFound) {
            const newSetlist = currentSetlist.filter(song => song !== id)
            setCurrentSetlist(newSetlist)
        }
    }


    useEffect(()=>{
        
        selected ? addSong() : deleteSong()

    },[selected])

  return (
    <SongToSelectStyled gradientcolors={backgroundColors(tags)} onClick={()=>setSelected(!selected)} selected={selected} title={name}><h3 selected={selected}>{name}</h3><h4>{artist}</h4></SongToSelectStyled>
  )
}

export default SongToAddCard