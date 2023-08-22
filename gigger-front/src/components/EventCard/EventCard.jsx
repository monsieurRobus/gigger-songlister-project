import React, { useEffect, useState } from 'react'
import { dateToDDMMYYYYHHMM } from '../../utils/swissknife'
import { EventCardStyled } from '../../ui/EventsElements'
import { CloseButtonStyled } from '../../ui/BubbleElements'
import { useAuth } from '../../hooks/AuthContext'
import { deleteEvent, getAllEvents } from '../../services/events.service'
import { useEventsError } from '../../hooks/useEventsError'


const EventCard = (props) => {
    const {id,name,place,date,description,contactName,contactPhone,contactEmail,setlist,userOwner,events,setEvents,del,setDel,res,setRes} = props
    const {user,logout} = useAuth()
    const [ok,setOk] = useState(false)
    

    const handlerDelete = async() => {
        setDel(false)
        setRes(await deleteEvent(id))
        
    }

   

  return (
    <EventCardStyled>
        <div><CloseButtonStyled onClick={handlerDelete} owner={user._id === userOwner? 'true': null}>✖️</CloseButtonStyled></div>
        <h3>{name}</h3>
        <h4>{place}</h4>
        <h4>{dateToDDMMYYYYHHMM(date)}</h4>
        
    </EventCardStyled>
  )
}

export default EventCard