import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addTag, getAllTags, getAllTagsPaginated } from '../../services/tags.service'
import { update } from '../../services/user.service'
import { toast } from 'sonner'
import {useTagsError} from '../../hooks/useTagsError'
import { useAuth } from '../../hooks/AuthContext'

const TagForm = (props) => {

    const [res,setRes] = useState({})
    const {tags,setTags} = props
    const [send,setSend] =useState(false)
    const [ok,setOk] = useState(false)
    const { register, handleSubmit, errors } = useForm()
    const {user, logout} = useAuth()

    const handleAddTag = async (formData) => {

        const valuesToSend = {
            name: formData.name,
            description: formData.description,
            color: formData.color
        }

        setSend(true)
        setRes(await addTag(valuesToSend))
        setSend(false)
        
    }
    
    useEffect(()=>{

        useTagsError(res,setOk,setRes,logout)
        
        res?.data?.tag ? setTags([...tags,res?.data?.tag]) :null

    },[res])

   return (
    <div>
        {user.role==="admin"? <form onSubmit={handleSubmit(handleAddTag)}>
            <label>Tag name</label><input type="text" name="tag-name" {...register("name")}/>
            <label>Description</label><input type="text" name="description" {...register("description")}/>
            <label>Tag color</label><input type="color" name="color" {...register("color")}/>
            <input type="submit" />
        </form>: null}
    </div>
  )
}

export default TagForm