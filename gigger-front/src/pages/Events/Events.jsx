import React, { useEffect, useState } from 'react'
import './Events.css'
import { useParams } from 'react-router'
import { getAllEventsPaginated } from '../../services/events.service'


const Events = () => {
    const { pageReq } = useParams()
    const [events, setEvents] = useState([])
    const [event,setEvent] = useState({})
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])

    useEffect(()=>{
        const getEvents = async()=> {
            const res = await getAllEventsPaginated(page)
            setEvents(res.data.events)
            setTotalPages(res.data.totalPages)
        }

        getEvents()
    },[page])


  return (
    <div>Events</div>
  )
}

export default Events