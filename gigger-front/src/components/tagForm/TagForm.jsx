import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addTag, getAllTags, getAllTagsPaginated, updateTag } from '../../services/tags.service'
import {useTagsError} from '../../hooks/useTagsError'
import { useAuth } from '../../hooks/AuthContext'
import { ModalContentFormStyled, ModalContentStyled, ModalCloseButton } from '../../ui/ModalElements'
import { OpenModalStyled } from '../../ui/BubbleElements'
import { StreetViewService } from '@react-google-maps/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
const TagForm = (props) => {

    
    const {tags,setTags,res,setRes,visible,setVisible,editMode,setEditMode,editTag} = props
    const [send,setSend] =useState(false)
    const [ok,setOk] = useState(false)
    const { register, handleSubmit, errors, reset, setValue } = useForm()
    const {user, logout} = useAuth()
    const [editTagId,setEditTagId] = useState(null)

    const closeForm = () => {
        setVisible("false")
        setEditMode(false)
        reset()
    }

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

    const handleEditTag = async (formData) => {
        console.log(formData)
        const valuesToSend = {
            name: formData.name,
            description: formData.description,
            color: formData.color
        }

        setSend(true)
        setRes(await updateTag(valuesToSend,editTagId))


        setTags(tags.map(tag=> {
            if(tag._id === editTagId)
                return {...tag, name: valuesToSend.name, description: valuesToSend.description, color: valuesToSend.color }
            else
                return tag
        }))

        setSend(false)
        closeForm()
    }
    
    useEffect(()=>{

        useTagsError(res,setOk,setRes,logout)
        
    },[res])

    useEffect(()=>{
        
        if(editMode){
            console.log(editTag[0])
            setValue("name",editTag[0].name)
            setValue("description",editTag[0].description)
            setValue("color",editTag[0].color)
            setEditTagId(editTag[0]._id)
        }
    },[editTag])

   return (
    <ModalContentStyled>
        <ModalCloseButton onClick={closeForm}><FontAwesomeIcon icon={faCircleXmark}/></ModalCloseButton>
        {user.role==="admin"? <ModalContentFormStyled onSubmit={editMode? handleSubmit(handleEditTag):handleSubmit(handleAddTag)}>
        
            <h3>Input tag</h3>
            <label>Tag name<input type="text" name="tag-name" {...register("name")}/></label>
            <label>Description<input type="text" name="description" {...register("description")}/></label>
            <label>Tag color<input type="color" name="color" {...register("color")}/></label>
            <input disabled={send} type="submit" />
        </ModalContentFormStyled>: null}
        
    </ModalContentStyled>
  )
}

export default TagForm