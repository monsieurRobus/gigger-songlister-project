import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/AuthContext'
import { SelectedSongListStyled, SetlistInfoStyled, SetlistFormFatherStyled, SelectedSongsStyled, SongSelectionListStyled, SongSelectStyled, SongToSelectStyled, SetlistBubbleMain, DurationBubbleStyled } from '../../ui/SetlistFormElement'
import { getAllSongs, getAllSongsPaginated } from '../../services/songs.service'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import SongToAddCard from '../SongCard/SongToAddCard'
import { ReactSortable } from 'react-sortablejs'
import ListElement from './ListElement'
import { secondsToHMS } from '../../utils/swissknife'
import { addSetlist, updateSetlist } from '../../services/setlists.service'
import { getAllEventsPaginated } from '../../services/events.service'
import { ModalCloseButton, ModalContentFormStyled, ModalContentStyled, ModalSectionStyled, ModalSectionWrapperStyled } from '../../ui/ModalElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import MultiRangeSlider from "multi-range-slider-react";
import { TagBubbleStyled } from '../../ui/BubbleElements'
import { TagFilter } from '../../pages/Tags/TagFilter'
const SetlistForm = (props) => {
  const [songlist,setSonglist] = useState([])
  const {setlists, setSetlists, tags, res, setRes,setVisible,editMode,editSetlist,setEditSetlist,setEditMode} = props  
  const [send,setSend] =useState(false)
  const [ok,setOk] = useState(false)
  const { register, handleSubmit, errors, reset, setValue } = useForm()
  const {user, logout} = useAuth()
  const [currentSetlist,setCurrentSetlist] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page,setPage] =useState(1)
  const [songPaginator, setSongPaginator] = useState([])  
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const [minFilterDuration,setMinFilterDuration] = useState(0)
  const [maxFilterDuration,setMaxFilterDuration] =useState(600)
  const [filterTags,setFilterTags] = useState([])
  const [filteredSonglist,setFilteredSonglist] = useState([])
  const [filterName,setFilterName] = useState("")
  const [filterArtist,setFilterArtist] = useState("")
  const [editSetlistId,setEditSetlistId] = useState(null)


  const handleEditSetlist = async(formData) => {
    const valuesToSend = {
      name: formData.name,
      description: formData.description,
      songs: currentSetlist
     }

     setSend(true)
     setRes(await updateSetlist(valuesToSend,editSetlistId))
     setSend(false)
     closeForm()
  }

  const handeAddSetlist = async(formData) => {
     const valuesToSend = {
      name: formData.name,
      description: formData.description,
      songs: currentSetlist
     }

     setSend(true)
     setRes(await addSetlist(valuesToSend))
     setSend(false)
     closeForm()

  }

  const closeForm = () => {
    setVisible("false")
    setEditMode(false)
    setCurrentSetlist([])
    reset()
}



  useEffect(()=>{

    reset({
        name: "",
        description: "",
        notes: ""        
    })
    setCurrentSetlist([])
    

},[res])

  const setlistDuration = () => {
    if (currentSetlist.length > 0){
    const selection = []
    currentSetlist.forEach(songId => {
      const foundSong = songlist.find(song=> song._id === songId)
      selection.push(foundSong)
    })
    
    return selection.reduce((acc, song) => 
      
       (acc + song?.duration),0)
    
}
  else {
    return 0
  }
  }

  const getSongList = async (page) => {
  
    const songs = await getAllSongs()
    setSonglist(songs?.data?.songs)    
  }

  useEffect(()=>{


    setFilteredSonglist(
     songlist.filter(song => {
            const activateNameFilter = filterName != "" ?  song.name.toLowerCase().includes(filterName.toLowerCase()) : true;
            const activateArtistFilter = filterArtist != "" ? song.artist.toLowerCase().includes(filterArtist.toLowerCase()) : true;
            const activateDurationFilter = song.duration >= minFilterDuration && song.duration <= maxFilterDuration
            const activateFilterTags = filterTags.every(tag => song.tags.includes(tag.id))
          return activateNameFilter && activateArtistFilter && activateDurationFilter && activateFilterTags
      })

      
    )
    

  },[filterTags,filterName,filterArtist,minFilterDuration,maxFilterDuration])

  // useEffect(()=>{
  //   console.log(filteredSonglist)
  // },[filteredSonglist])

  useEffect(()=>{

    getSongList(page)

  },[page])

  const durationFilter = (e) => 
  {
    setMinFilterDuration(e.minValue)
    setMaxFilterDuration(e.maxValue)
  }

  useEffect(()=>{
    
    

    if(editMode){
      const setlistSelection = () => {

        const list = songlist.filter(song=> editSetlist.songs?.includes(song._id)).map(song=> song._id)
        setCurrentSetlist(list)
        console.log(list)
      }
      setlistSelection()
      setEditSetlistId(editSetlist.id)
      console.log(editSetlist)
      setValue("name",editSetlist.name)
      setValue("description",editSetlist.description)
    }


  },[editSetlist])

  useEffect(()=>{
    console.log(currentSetlist)
  },[currentSetlist])

  return (
    <ModalContentStyled>
    <DurationBubbleStyled>
        <h2>Duration</h2>
        <h3>{secondsToHMS(setlistDuration())}</h3>
      </DurationBubbleStyled>
      <SetlistBubbleMain>
        <h2>Songs</h2>
        <h3>{currentSetlist.length}</h3>
    </SetlistBubbleMain>
    <ModalCloseButton className={'modal-close'} onClick={closeForm}><FontAwesomeIcon icon={faCircleXmark}/></ModalCloseButton>
        {user.role==="admin"? 
        <ModalContentFormStyled className={'modal-styles'} onSubmit={editMode? handleSubmit(handleEditSetlist):handleSubmit(handeAddSetlist)}>
            <ModalSectionWrapperStyled>
              <ModalSectionStyled>
                <div className={'basic-info'}>
                <label>Setlist Name</label><input type="text" name="song-name" {...register("name")}/>
                <label>Description</label><input type="text" name="artist-name" {...register("description")}/>
                </div>
              </ModalSectionStyled>
            
            <ModalSectionStyled>
            <div className={'base-filters'}>
              <label>Song name</label><input type="text" onChange={(e)=>setFilterName(e.target.value)}/>
              <label>Artist name</label><input type="text" onChange={(e)=>setFilterArtist(e.target.value)}/>
              <label>Duration</label>
              <MultiRangeSlider 
                min={0} 
                max={600} 
                step={1}
                minValue={minFilterDuration}
                maxValue={maxFilterDuration}
                onInput={(e) =>{durationFilter(e)}}
                ruler={false} />
              </div>
              <div className={'tags-filters'}>
                <label>Tags filter</label>
                <div className={'tags'}>
                  {tags && tags.map(tag => <TagFilter applyFilters={false} filterTags={filterTags} setFilterTags={setFilterTags} key={tag._id} id={tag._id} colour={tag.color} name={tag.name}/>)}
                </div>
              </div>
            </ModalSectionStyled>
            </ModalSectionWrapperStyled>
            <SongSelectStyled>
              <SelectedSongsStyled>
                <ReactSortable tag={SelectedSongListStyled} list={currentSetlist} setList={setCurrentSetlist}>
                  {currentSetlist.map((song, index) => <ListElement tagList={tags} index={index} key={song} songlist={songlist} id={song}/>)}
                </ReactSortable>
              </SelectedSongsStyled>
              <SongSelectionListStyled>
                <div ref={parent}>
                  {filteredSonglist?.map(  (songToSelect, index)=> 
                    <SongToAddCard 
                    tagList={tags}
                      currentSetlist={currentSetlist} 
                      alreadySelected={currentSetlist.find(song=>songToSelect._id === song)} 
                      index={index}
                      setCurrentSetlist={setCurrentSetlist} 
                      key={songToSelect._id} 
                      name={songToSelect.name} 
                      duration={songToSelect.duration}
                      artist={songToSelect.artist} 
                      tags={songToSelect.tags}
                      id={songToSelect._id}
                    />)}
                </div>
              </SongSelectionListStyled>
            </SongSelectStyled>
            <input disabled={send} type="submit" />
        </ModalContentFormStyled>: null}
    </ModalContentStyled>
  )
}

export default SetlistForm