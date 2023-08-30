import React, { useState, useEffect} from 'react'
import './Songs.css'
import { getAllSongsPaginated, getFilteredSongsPaginated } from '../../services/songs.service'
import { useParams } from 'react-router'
import SongForm from '../../components/songForm/SongForm'
import SongCard from '../../components/SongCard/SongCard'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { getAllTags } from '../../services/tags.service'
import { useSongsError } from '../../hooks/useSongsError'
import { useAuth } from '../../hooks/AuthContext'
import { FilterSectionStyled, SongsMainStyled, SongsSectionStyled, TagsFilterSwitchDivStyled, TagsFilterSwitchStyled } from '../../ui/SongElements'
import { NumberOfSongsStyled, OpenModalStyled } from '../../ui/BubbleElements'
import { ModalWrapperStyled } from '../../ui/ModalElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { TagFilter } from '../Tags/TagFilter'

const Songs = () => {
    const { pageReq } = useParams()
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const [ok,setOk] = useState(false)
    const [songs, setSongs] = useState([])
    const [tags,setTags] = useState([])
    const [filterTags,setFilterTags] = useState([])
    const [filterName,setFilterName] = useState("")
    const [filters,setFilters] = useState({})
    const [applyFilters,setApplyFilters] = useState(false)
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])
    const [res,setRes] = useState({})
    const {user,logout} = useAuth()
    const [visible,setVisible] = useState("false")
    const [editMode,setEditMode] = useState(false)
    const [editSong,setEditSong] = useState({})

  

    const handleApplyFilters = () => 
    {
      
      setApplyFilters(!applyFilters)
    }

    useEffect(()=>{
        const getSongs = async()=> {

                   
            const resSongs = applyFilters? await getFilteredSongsPaginated(page,{name: filterName, tags: filterTags}) : await getAllSongsPaginated(page)
            setTotalPages(resSongs.data?.totalPages)
            
            setSongs(resSongs?.data?.songs)
            
        }
        getSongs()
        useSongsError(res,setOk,setRes,logout)
    },[page,res,applyFilters])

    useEffect(()=> {
      setPage(totalPages)
    },[totalPages])

    useEffect(() => {

      const pages = []
      for(let i = 1; i <= totalPages; i++){
        pages.push(<button key={i} onClick={()=>setPage(i)}>{i}</button>)
      }
      setPaginator(pages)


    },[songs])

   
    useEffect(()=>{
      const getTags = async() => {
        const res = await getAllTags()
        setTags(res.data?.tags)
      }
      
      getTags()

    },[])

  return (
    <SongsMainStyled>
    
      <NumberOfSongsStyled>
        <h3>Songs:</h3> <h2>{songs?.length}</h2>
      </NumberOfSongsStyled>
      <FilterSectionStyled>
        <h4>Filters</h4>
        
          <label>Artist name:<input disabled={applyFilters} onChange={e=>setFilterName(e.target.value)}></input></label>
          <div>
            <label>Tags</label>
            <TagsFilterSwitchDivStyled>
            {tags && tags.map(tag=> <TagFilter applyFilters={applyFilters} filterTags={filterTags} setFilterTags={setFilterTags} key={tag._id} id={tag._id} colour={tag.color} name={tag.name}/>)}
            </TagsFilterSwitchDivStyled>
          </div>          
          
          <div>
            <button onClick={()=>handleApplyFilters()}>Apply filter</button>
          </div>
          
        
      </FilterSectionStyled>
      <SongsSectionStyled>
      
      <section ref={parent}>
      <h2>Songs</h2>
        { songs?.length>0 ? songs.map(song=>
          <SongCard  setEditMode={setEditMode} setEditSong={setEditSong} setVisible={setVisible} tagList={tags} res={res} setRes={setRes} key={song._id} song={song} />
        ) : <h2>No songs at all 😞</h2>}
      </section>
      <nav>{paginator.map((page)=>page)}</nav>
      </SongsSectionStyled>
      
      <ModalWrapperStyled visible={visible}><SongForm editSong={editSong} setVisible={setVisible} editMode={editMode} setEditMode={setEditMode} res={res} setRes={setRes} page={page}  setPage={setPage} songs={songs} setSongs={setSongs} /></ModalWrapperStyled>
      <OpenModalStyled onClick={()=>setVisible(visible=="true"?"false":"true")}><FontAwesomeIcon icon={faPlusSquare}/></OpenModalStyled>
    </SongsMainStyled>
  
  )
}

export default Songs