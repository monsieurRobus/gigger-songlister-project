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
import { addSetlist } from '../../services/setlists.service'
import { getAllEventsPaginated } from '../../services/events.service'
import { ModalCloseButton, ModalContentFormStyled, ModalContentStyled } from '../../ui/ModalElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

const SetlistForm = (props) => {
  const [songlist,setSonglist] = useState([])
  const {setlists, setSetlists, tagList, res, setRes,setVisible,editMode,setEditMode} = props  
  const [send,setSend] =useState(false)
  const [ok,setOk] = useState(false)
  const { register, handleSubmit, errors, reset } = useForm()
  const {user, logout} = useAuth()
  const [currentSetlist,setCurrentSetlist] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page,setPage] =useState(1)
  const [songPaginator, setSongPaginator] = useState([])  
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  const handeAddSetlist = async(formData) => {
     const valuesToSend = {
      name: formData.name,
      description: formData.description,
      songs: currentSetlist
     }

     setSend(true)
     setRes(await addSetlist(valuesToSend))
     setSend(false)

  }

  const closeForm = () => {
    setVisible("false")
    setEditMode(false)
    setCurrentSetlist([])
    reset()
}

  //   useEffect(()=>{
  //     const getSongs = async()=> {
  //         const res = await getAllEventsPaginated(page)
  //         setEvents(res?.data?.events)
  //         setTotalPages(res.data.totalPages)
  //     }

  //     getSongs()
  // },[page])

  useEffect(()=>{

    // useSongsError(res,setOk,setRes,logout)
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

    getSongList(page)

  },[page])

  useEffect(() => {

    const pages = []
    for(let i = 1; i <= totalPages; i++){
      pages.push(<button key={i} onClick={()=>setPage(i)}>{i}</button>)
    }
    
    setSongPaginator(pages)
    

  },[songlist])

  useEffect(()=>{
    // console.log(currentSetlist)
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
    <ModalCloseButton onClick={closeForm}><FontAwesomeIcon icon={faCircleXmark}/></ModalCloseButton>
        {user.role==="admin"? <ModalContentFormStyled onSubmit={handleSubmit(handeAddSetlist)}>
            <label>Setlis Name</label><input type="text" name="song-name" {...register("name")}/>
            <label>Description</label><input type="text" name="artist-name" {...register("artist")}/>
            
            <label>Notes</label><input type="text" name="notes" {...register("notes")}/>
              
            <SongSelectStyled>
              <SelectedSongsStyled>
                <ReactSortable tag={SelectedSongListStyled} list={currentSetlist} setList={setCurrentSetlist}>
                  {currentSetlist.map((song, index) => <ListElement index={index} key={song} songlist={songlist} id={song}/>)}
                </ReactSortable>
              </SelectedSongsStyled>
              <SongSelectionListStyled>
                <div ref={parent}>
                  {songlist?.map(  (songToSelect, index)=> 
                    <SongToAddCard 
                    tagList={tagList}
                      currentSetlist={currentSetlist} 
                      alreadySelected={currentSetlist.find(song=>songToSelect._id === song)} 
                      index={index}
                      setCurrentSetlist={setCurrentSetlist} 
                      key={songToSelect._id} 
                      name={songToSelect.name} 
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