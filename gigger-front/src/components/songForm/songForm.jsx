import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/AuthContext'
import { addSong, updateSong } from '../../services/songs.service'
import { ReactTags } from 'react-tag-autocomplete'
import { getAllTags } from '../../services/tags.service'
import { TagBubbleStyled } from '../../ui/BubbleElements'
import { useSongsError } from '../../hooks/useSongsError'
import { SongsFormSectionStyled } from '../../ui/SongElements'
import { ModalCloseButton, ModalContentFormStyled, ModalContentStyled } from '../../ui/ModalElements'
import './SongForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

const SongForm = (props) => {
  const {songs,setSongs,page,setPage,res,setRes,editSong,setVisible,editMode,setEditMode} = props
  const [send,setSend] =useState(false)
  const [ok,setOk] = useState(false)
  const { register, handleSubmit, errors, reset, setValue } = useForm()
  const [tags,setTags] = useState([])
  const [suggestions,setSuggestions]=useState([])
  const {user, logout} = useAuth()
  const [tagSelected, setTagsSelected] = useState([])
  const [editSongId,setEditSongId] =useState(null)
  
  const handleAddTag = useCallback((tag) => {
    
    const tagCoincidence = tagSelected.find(tagSelect => tagSelect._id === tag._id)
    
    if(tagCoincidence)
    {
      setTagsSelected(tagSelected.filter(tagSelect => tagSelect._id !== tag._id))
    }
    else 
    {
      setTagsSelected([...tagSelected,tag])
    }

    
  },[tagSelected])

  const closeForm = () => {
      setVisible("false")
      setEditMode(false)
      setTagsSelected([])
      reset()
  }

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

const handleEditSong = async(formData) => {
  
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
setRes(await updateSong(valuesToSend,editSongId))


setSongs(songs.map(song=> {
    if(song._id === editSongId)
        return {...song, 
          name: valuesToSend.name, 
          artist: valuesToSend.artist, 
          duration: valuesToSend.duration,
          lyrics: valuesToSend.lyrics,
          notes: valuesToSend.notes,
          user: valuesToSend.user,
          tags: valuesToSend.tags }
    else
        return song
}))

setSend(false)
closeForm()
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
},[res])

useEffect(()=>{
        
  if(editMode){
      setValue("name",editSong.name)
      setValue("artist",editSong.artist)
      setValue("duration",editSong.duration)
      setValue("lyrics",editSong.lyrics)
      setValue("notes",editSong.notes)

      // Preparamos el estado de TagsSelected para que aparezca en el formulario
      getTagsForSuggestions()
      console.log(tags)
      console.log(editSong.tags)
      const filteredTags = tags.filter(tag =>
        editSong.tags.find(tagSelected => tagSelected === tag._id)
      );

      setTagsSelected(filteredTags)
      setEditSongId(editSong._id)
  }
},[editSong])




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
      <ModalCloseButton onClick={closeForm}><FontAwesomeIcon icon={faCircleXmark}/></ModalCloseButton>
        {user.role==="admin"? <ModalContentFormStyled onSubmit={editMode? handleSubmit(handleEditSong):handleSubmit(handleAddSong)}>
        <h3>Input song</h3>
            <label>Song Name<input type="text" name="song-name" {...register("name")}/></label>
            <label>Artist<input type="text" name="artist-name" {...register("artist")}/></label>
            <label>Duration<input type="number" name="duration" {...register("duration")}/></label>
            <label>Lyrics<input type="text" name="lyrics" {...register("lyrics")}/></label>
            <label>Notes<input type="text" name="notes" {...register("notes")}/></label>
            <ReactTags onAdd={handleAddTag} onDelete={handleDeleteTag} selected={tagSelected} suggestions={suggestions} renderTag={selectedTagsStyled}/>
            <input disabled={send} type="submit" />
        </ModalContentFormStyled>: null}
    </ModalContentStyled>
  )
}

export default SongForm