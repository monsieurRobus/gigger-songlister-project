import React, { useState, useEffect} from 'react'
import './Songs.css'
import { getAllSongsPaginated } from '../../services/songs.service'
import { useParams } from 'react-router'
import SongForm from '../../components/songForm/songForm'
import SongCard from '../../components/SongCard/SongCard'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { getAllTags } from '../../services/tags.service'
import { useSongsError } from '../../hooks/useSongsError'
import { useAuth } from '../../hooks/AuthContext'

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
    useEffect(()=>{
        const getSongs = async()=> {
            const resSongs = await getAllSongsPaginated(page)
            setSongs(resSongs.data.songs)
            setTotalPages(resSongs.data.totalPages)
        }

        getSongs()

        useSongsError(res,setOk,setRes,logout)
    },[page,res])

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
    <main>
      <nav>{paginator.map((page)=>page)}</nav>
      <section ref={parent}>
        { songs && songs.map(song=>
          <SongCard  tagList={tags} res={res} setRes={setRes} key={song._id} song={song} />
        )}
      </section>
      <SongForm  page={page}  songs={songs} setSongs={setSongs} />
    </main>
  
  )
}

export default Songs