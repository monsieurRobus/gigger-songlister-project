import React, {useState, useEffect} from 'react'
import './Setlists.css'
import { useParams } from 'react-router'
import { getAllSetlistsPaginated } from '../../services/setlists.service'
import { socket } from '../../socket'

const Setlists = () => {
    const { pageReq } = useParams()
    const [setlists, setSetlists] = useState([])
    const [setlist,setSetlist] = useState({})
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])

    useEffect(()=>{
        const getSetlists = async()=> {
            const res = await getAllSetlistsPaginated(page)
            setSetlists(res.data.setlists)
            setTotalPages(res.data.totalPages)
        }

        getSetlists()
    },[page])
  return (
    <div>Setlists</div>
  )
}

export default Setlists