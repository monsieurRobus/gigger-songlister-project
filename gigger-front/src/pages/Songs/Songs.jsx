import React, { useState, useEffect} from 'react'
import './Songs.css'
import { getAllSongsPaginated } from '../../services/songs.service'
import { useParams } from 'react-router'
import SongForm from '../../components/songForm/songForm'
import SongCard from '../../components/SongCard/SongCard'

const Songs = () => {
    const { pageReq } = useParams()
    const [songs, setSongs] = useState([])
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])

    useEffect(()=>{
        const getSongs = async()=> {
            const res = await getAllSongsPaginated(page)
            setSongs(res.data.songs)
            setTotalPages(res.data.totalPages)
        }

        getSongs()
    },[page])

  return (
    <div>
      <section>
        { songs && songs.map(song=>
          <SongCard key={song._id} song={song} />
        )}
      </section>
      <SongForm songs={songs} setSongs={setSongs} />
    </div>
  
  )
}

export default Songs