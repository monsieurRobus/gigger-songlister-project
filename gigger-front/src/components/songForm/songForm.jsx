import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/AuthContext'
import { addSong } from '../../services/songs.service'
import { ReactTags } from 'react-tag-autocomplete'
import { getAllTags } from '../../services/tags.service'
import { TagBubbleStyled } from '../../ui/BubbleElements'
import { useSongsError } from '../../hooks/useSongsError'
import { SongsFormSectionStyled } from '../../ui/SongElements'
import { ModalContentFormStyled, ModalContentStyled } from '../../ui/ModalElements'
import './SongForm.css'

const SongForm = (props) => {
  const {songs,setSongs,page,setPage,res,setRes} = props
  const [send,setSend] =useState(false)
  const [ok,setOk] = useState(false)
  const { register, handleSubmit, errors, reset } = useForm()
  const [tags,setTags] = useState([])
  const [suggestions,setSuggestions]=useState([])
  const {user, logout} = useAuth()
  const [tagSelected, setTagsSelected] = useState([])
  
  const handleAddTag = useCallback((tag) => {
    console.log(tag)
    setTagsSelected([...tagSelected,tag])

  },[tagSelected])

  const handleDeleteTag = useCallback((tagIndex) => {
    setTagsSelected(tagSelected.filter((tag,i) => i !== tagIndex))
  },[tagSelected])

  const handleAddSong = async (formData) => {

    const valuesToSend = {
        name: formData.name,
        artist: formData.artist,
        duration: formData.duration,
        lyrics: formData.lyrics,
        notes: formData.notes,
        user: user._id,
        tags: tagSelected
    }

    setSend(true)
    setRes(await addSong(valuesToSend))
    setSend(false)
    
}

const getTagsForSuggestions = async () => {
  
  const tagsForSuggestions = await getAllTags()
  setTags(tagsForSuggestions.data.tags)
  const tags2suggestions = tagsForSuggestions.data?.tags.map((tag,index) => ({...tag, value: index, label: tag.name}))
  setSuggestions(tags2suggestions)
}


useEffect(()=>{

    useSongsError(res,setOk,setRes,logout)
    reset({
        name: "",
        artist: "",
        duration: "",
        lyrics: "",
        notes: ""        
    })
    setTagsSelected([])
    setPage(res?.data?.totalPages)
    console.log(res?.data?.totalPages)
},[res])

useEffect(()=>{

  getTagsForSuggestions()

},[])

const selectedTagsStyled = ({ classNames, tag, ...tagProps })=> (
  <TagBubbleStyled color={tag.color}>{tag.name}</TagBubbleStyled>
)


const optionTagStyled = ({ children, classNames, option, ...optionProps }) => {
  <label>
    {children}
  </label>
}



  return (
    
    <ModalContentStyled>
    
        {user.role==="admin"? <ModalContentFormStyled onSubmit={handleSubmit(handleAddSong)}>
        <h3>Input song</h3>
            <label>Song Name<input type="text" name="song-name" {...register("name")}/></label>
            <label>Artist<input type="text" name="artist-name" {...register("artist")}/></label>
            <label>Duration<input type="number" name="duration" {...register("duration")}/></label>
            <label>Lyrics<input type="text" name="lyrics" {...register("lyrics")}/></label>
            <label>Notes<input type="text" name="notes" {...register("notes")}/></label>
            <ReactTags onAdd={handleAddTag} onDelete={handleDeleteTag} selected={tagSelected} suggestions={suggestions} renderTag={selectedTagsStyled}/>
            <input type="submit" />
        </ModalContentFormStyled>: null}
    </ModalContentStyled>
  )
}

export default SongForm