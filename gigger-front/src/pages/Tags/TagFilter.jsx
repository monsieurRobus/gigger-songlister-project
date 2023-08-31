import React, { useEffect, useState } from "react"
import { TagsFilterSwitchStyled } from "../../ui/SongElements"



export const TagFilter = (props) => {
    const {name,id,colour,filterTags,setFilterTags,applyFilters} = props
    const [active,setActive] = useState(false)
    
    const handleActive = (e) => {
      e.preventDefault()
      setActive(!active)
    }

    const handleAddTag = (tag) =>{
      setFilterTags([...filterTags,tag])
    }
    const handleDeleteTag = (tag) =>{
      setFilterTags(filterTags.filter(tag=> tag.id !== id))
    }

    useEffect(()=>{
      
      active? handleAddTag({id,name,colour}) : handleDeleteTag({id,name,colour})
      
    },[active])

 
  
    return <TagsFilterSwitchStyled disabled={applyFilters} className={active?'active':''} onClick={handleActive} colour={colour}>
            {name}
            </TagsFilterSwitchStyled> 

  }