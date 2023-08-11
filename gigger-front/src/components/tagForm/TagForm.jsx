import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addTag, getAllTags } from '../../services/tags.service'
import { update } from '../../services/user.service'

const TagForm = (props) => {

    const [res,setRes] = useState({})
    // const [tags,setTags] = useState([])
    const {tags,setTags} = props
    const [send,setSend] =useState(false)

    const { register, handleSubmit, errors } = useForm()

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
        setTags(res.data?.tags)
    },[res])


   

  return (
    <div>
        <form onSubmit={handleSubmit(handleAddTag)}>
            <label>Tag name</label><input type="text" name="tag-name" {...register("name")}/>
            <label>Description</label><input type="text" name="description" {...register("description")}/>
            <label>Tag color</label><input type="color" name="color" {...register("color")}/>
            <input type="submit" />
        </form> 
    </div>
  )
}

export default TagForm