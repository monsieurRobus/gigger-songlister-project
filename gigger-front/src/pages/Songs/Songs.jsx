import React, { useState, useEffect} from 'react'
import './Songs.css'
import { getAllSongsPaginated } from '../../services/songs.service'
import { useParams } from 'react-router'

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
    <div>Songs</div>
  )
}

export default Songs