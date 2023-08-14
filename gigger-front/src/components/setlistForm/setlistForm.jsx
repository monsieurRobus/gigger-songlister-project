import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/AuthContext'
import { SelectedSongsStyled, SongSelectionListStyled, SongSelectStyled, SongToSelectStyled } from '../../ui/SetlistFormElement'
import { getAllSongs, getAllSongsPaginated } from '../../services/songs.service'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const SetlistForm = (props) => {
  const [res,setRes] = useState({})
  const [songlist,setSonglist] = useState([])
  const {setlists, setSetlists} = props  
  const [send,setSend] =useState(false)
  const [ok,setOk] = useState(false)
  const { register, handleSubmit, errors, reset } = useForm()
  const [tags,setTags] = useState([])
  const [suggestions,setSuggestions]=useState([])
  const {user, logout} = useAuth()
  const [tagSelected, setTagsSelected] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page,setPage] =useState(1)
  const [songPaginator, setSongPaginator] = useState([])  
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  const handeAddSetlist = () => {

  }

  const SongToAdd = (id,name) => (
      <SongToSelectStyled key={id}>{name}</SongToSelectStyled>
  )

  const getSongList = async (page) => {
  
    const songs = await getAllSongsPaginated(page)
    setSonglist(songs.data.songs)    
    setTotalPages(songs.data.totalPages)
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

  return (
    <section>
        {user.role==="admin"? <form onSubmit={handleSubmit(handeAddSetlist)}>
            <label>Setlis Name</label><input type="text" name="song-name" {...register("name")}/>
            <label>Description</label><input type="text" name="artist-name" {...register("artist")}/>
            
            <label>Notes</label><input type="text" name="notes" {...register("notes")}/>
            <SongSelectStyled>
              <SelectedSongsStyled>a</SelectedSongsStyled>
              <SongSelectionListStyled>
                <div>filters</div>
                <div>{songPaginator.map((currentPage)=>currentPage)}</div>
                <div ref={parent}>{songlist.map(songToSelect=> SongToAdd(songToSelect._id,songToSelect.name))}</div>
              </SongSelectionListStyled>
            </SongSelectStyled>
            <input type="submit" />
        </form>: null}
    </section>
  )
}

export default SetlistForm