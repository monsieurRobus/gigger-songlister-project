import React, { useCallback, useEffect, useState } from 'react'
import './Events.css'
import { useParams } from 'react-router'
import { getAllEvents, getAllEventsPaginated } from '../../services/events.service'
import Calendar from 'react-calendar'
import EventForm from '../../components/EventForm/EventForm'
import EventCard from '../../components/EventCard/EventCard'
import { EventCalendarContentStyled } from '../../ui/BubbleElements'
import { useEventsError } from '../../hooks/useEventsError'
import { useAuth } from '../../hooks/AuthContext'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { EventMainStyled } from '../../ui/EventsElements'





const Events = () => {
    const { pageReq } = useParams()
    const [date,setDate]=useState(new Date("2023-08-22"))
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const [allowDeleteEvents,setAllowDeleteEvents] = useState(true)
    const [events,setEvents]=useState([])
    const [map,setMap] = useState()
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])
    const [filterMonth,setFilterMonth] = useState(false)
    const [filterPast,setFilterPast] = useState(false)
    const [res,setRes] = useState({})
    const [ok,setOk] = useState(false)
    const {user,logout} = useAuth()
    const [del,setDel] =useState(true)
    

  const isSameDay = useCallback((date1,date2) =>{
    const d1 = new Date(date1).getDate()
    const d2 = new Date(date2).getDate()
    

    const m1 = new Date(date1).getMonth()
    const m2 = new Date(date2).getMonth()
    
    const a1 = new Date(date1).getYear()
    const a2 = new Date(date2).getYear()


    return (d1 === d2 ) && (m1 === m2) && (a1 === a2)
  },[events])

  

  
  const nextEvents = ({date,view}) => {
    if(view=='month')
    {
      
      if(events?.length>0 && events?.find(fecha => isSameDay(fecha.date,date)))
      {
        return "event"
      }
      
    }
  }
  const nextEventsContent = ({date,view}) => {
    if(view=='month')
    { 
      
      if(events?.length>0 && events?.find(fecha => isSameDay(fecha.date,date)))
      {
        const content = events?.filter(fecha => isSameDay(fecha.date,date))
        return content.map(singleEvent => <EventCalendarContentStyled key={singleEvent._id}>{singleEvent.name}</EventCalendarContentStyled>)
      }
      
    }
  }

    useEffect(()=>{
        const getEvents = async()=> {
        
            const res = await getAllEvents()
            setEvents(res?.data?.event)
            // setTotalPages(res?.data.totalPages)
        }

        getEvents()

    },[res])


    const handleClickDay = () => {

    }


    const handleFilterMonth = () => {
      setFilterMonth(!filterMonth)
    }
    const handleFilterPast = () => {
      setFilterPast(!filterPast)
    }

  return (
    
    <EventMainStyled className={"events"}>
      <section className={"events-main-view"}>
      <aside className={"calendar-side"}>
        <Calendar  
        
          value={date}
          onClickDay={handleClickDay}
          onChange={setDate}
          tileClassName={nextEvents}
          tileContent={nextEventsContent}
          />
      </aside>
      <section className={"calendar-main"}>
      <h1>Events:</h1>
      <div>
        <button  onClick={handleFilterMonth}>{filterMonth? "✔️Mes actual":"Mes actual"}</button><button onClick={handleFilterPast}>{filterPast? "✔️Futuros bolos":"Futuros bolos"}</button>
      </div>
        <div ref={parent} className={"event-list"}>
          {events?.length>0 && events.map(event => 
          <EventCard 
            key={event._id} 
            id={event._id}
            name={event.name} 
            place={event.place} 
            date={event.date}
            setlist={event.setlist}
            userOwner={event.user}
            setEvents={setEvents}
            events={events}
            del={allowDeleteEvents}
            setDel={setAllowDeleteEvents}
            res={res}
            setRes={setRes}

            />
          
          )}

          
        </div>
        
      </section>
      </section>
      <section><EventForm events={events} setEvents={setEvents} res={res} setRes={setRes}/></section>
      
    </EventMainStyled>
  )
}

export default Events