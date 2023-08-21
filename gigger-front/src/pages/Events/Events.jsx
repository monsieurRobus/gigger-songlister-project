import React, { useCallback, useEffect, useState } from 'react'
import './Events.css'
import { useParams } from 'react-router'
import { getAllEvents, getAllEventsPaginated } from '../../services/events.service'
import Calendar from 'react-calendar'
import EventForm from '../../components/EventForm/EventForm'





const Events = () => {
    const { pageReq } = useParams()
    const [date,setDate]=useState(new Date("2023-08-22"))
    const [events,setEvents]=useState([])
    const [map,setMap] = useState()
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])
    const [filterMonth,setFilterMonth] = useState(false)
    const [filterPast,setFilterPast] = useState(false)
    

    useEffect(() => {

      if(filterMonth)
      {
        if(filterPast)
        {
          console.log(Lalala)
        }
      }


    },[events])
    

  const isSameDay = useCallback((date1,date2) =>{
    const d1 = new Date(date1).getDate()
    const d2 = new Date(date2).getDate()
    

    const m1 = new Date(date1).getMonth()
    const m2 = new Date(date2).getMonth()
    
    const a1 = new Date(date1).getYear()
    const a2 = new Date(date2).getYear()


    return (d1 === d2 ) && (m1 === m2) && (a1 === a2)
  },[events])

  

  useEffect(()=>{
    
  },[])
  
  const nextEvents = ({date,view}) => {
    if(view=='month')
    {
      
      if(events.find(fecha => isSameDay(fecha.date,date)))
      {
        return "event"
      }
      
    }
  }
  const nextEventsContent = ({date,view}) => {
    if(view=='month')
    {
      
      if(events.find(fecha => isSameDay(fecha.date,date)))
      {
        return <h3>Test</h3>
      }
      
    }
  }

    useEffect(()=>{
        const getEvents = async()=> {
        
            const res = await getAllEvents()
            setEvents(res.data.event)
            setTotalPages(res.data.totalPages)
        }

        getEvents()
    },[page])


    useEffect(()=>{
    },[])


    const handleFilterMonth = () => {
      setFilterMonth(!filterMonth)
    }
    const handleFilterPast = () => {
      setFilterPast(!filterPast)
    }

  return (
    <main className={"events"}>
      <section className={"events-main-view"}>
      <aside className={"calendar-side"}>
        <Calendar  
        
          value={date}
          onChange={setDate}
          tileClassName={nextEvents}
          tileContent={nextEventsContent}
          />
      </aside>
      <section className={"calendar-main"}>
      <h1>Eventos:</h1>
      <div>
        <button onClick={handleFilterMonth}>{filterMonth? "✔️Mes actual":"Mes actual"}</button><button onClick={handleFilterPast}>{filterPast? "✔️Futuros bolos":"Futuros bolos"}</button>
      </div>
        <div>
          {events.length >0 && events.map(event => 
          <div key={event._id}>
            <h1>{event.name}</h1>
          </div>
          )}

          
        </div>
        
      </section>
      </section>
      <section><EventForm /></section>
      
    </main>
  )
}

export default Events