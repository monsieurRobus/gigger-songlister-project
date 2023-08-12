import React, { useEffect, useState } from 'react'
import './Tags.css'
import { deleteTag, getAllTags, getAllTagsPaginated } from '../../services/tags.service'
import { toast } from 'sonner'
import { TagBubbleStyled, CloseButtonStyled, SpeechBubbleStyled } from '../../ui/BubbleElements'
import { useTagsError } from '../../hooks/useTagsError'
import { useAuth } from '../../hooks/AuthContext'


const TagBubble = (props) => {
    const {name,id,color,description,tags,setTags,page,del,setDel} = props
    const [res,setRes] = useState({})
    const [ok,setOk] = useState(false)
    const {user, logout} = useAuth()


    const handleDelete = async() => {
        
            id ? setRes(await deleteTag(id)):null
            
        
    }

    useEffect(()=>{
        
        const getTags = async()=> {
            const resp = await getAllTagsPaginated(page)
            setTags(resp.data.tags)
            setDel(true)
        }

        useTagsError(res,setOk,setRes,logout)

        getTags()
    
        
    },[res])




  return (
    <TagBubbleStyled color={color}>
        <h3>{name}</h3>
        {user.role==="admin" ? <CloseButtonStyled onClick={handleDelete} >X</CloseButtonStyled>: null}
        {description != "" && <SpeechBubbleStyled>{description}</SpeechBubbleStyled>}
    </TagBubbleStyled>
  )
}

export default TagBubble