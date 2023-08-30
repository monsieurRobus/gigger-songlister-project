import React, { useState, useEffect} from 'react'
import './Songs.css'
import { getAllSongsPaginated } from '../../services/songs.service'
import { useParams } from 'react-router'
import SongForm from '../../components/songForm/SongForm'
import SongCard from '../../components/SongCard/SongCard'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { getAllTags } from '../../services/tags.service'
import { useSongsError } from '../../hooks/useSongsError'
import { useAuth } from '../../hooks/AuthContext'
import { SongsMainStyled, SongsSectionStyled } from '../../ui/SongElements'
import { NumberOfSongsStyled, OpenModalStyled } from '../../ui/BubbleElements'
import { ModalWrapperStyled } from '../../ui/ModalElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

const Songs = () => {
    const { pageReq } = useParams()
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const [ok,setOk] = useState(false)
    const [songs, setSongs] = useState([])
    const [tags,setTags] = useState([])
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])
    const [res,setRes] = useState({})
    const {user,logout} = useAuth()
    const [visible,setVisible] = useState("false")

    useEffect(()=>{
        const getSongs = async()=> {
            const resSongs = await getAllSongsPaginated(page)
            setTotalPages(resSongs.data?.totalPages)
            
            setSongs(resSongs.data.songs)
            
        }
        getSongs()
        useSongsError(res,setOk,setRes,logout)
    },[page,res])

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
    <div>
      <h1>Song list</h1>
      
    </div>
      <NumberOfSongsStyled>
        <h3>Songs:</h3> <h2>{songs.length}</h2>
      </NumberOfSongsStyled>
      <SongsSectionStyled>
      
      <section ref={parent}>
        { songs?.length>0 ? songs.map(song=>
          <SongCard  tagList={tags} res={res} setRes={setRes} key={song._id} song={song} />
        ) : <h2>No songs at all 😞</h2>}
      </section>
      <nav>{paginator.map((page)=>page)}</nav>
      </SongsSectionStyled>
      
      <ModalWrapperStyled visible={visible}><SongForm  res={res} setRes={setRes} page={page}  setPage={setPage} songs={songs} setSongs={setSongs} /></ModalWrapperStyled>
      <OpenModalStyled onClick={()=>setVisible(visible=="true"?"false":"true")}><FontAwesomeIcon icon={faPlusSquare}/></OpenModalStyled>
    </SongsMainStyled>
  
  )
}

export default Songs