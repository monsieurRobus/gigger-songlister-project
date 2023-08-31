import React, { useEffect, useState } from 'react'
import { dateToDDMMYYYYHHMM } from '../../utils/swissknife'
import { EventCardStyled } from '../../ui/EventsElements'
import { CloseButtonStyled } from '../../ui/BubbleElements'
import { useAuth } from '../../hooks/AuthContext'
import { deleteEvent, getAllEvents } from '../../services/events.service'
import { useEventsError } from '../../hooks/useEventsError'


const EventCard = (props) => {
    const {id,name,place,date,type,file,description,contactName,contactPhone,contactEmail,setlist,userOwner,events,setEvents,setVisible,setEditMode,setEditEvent,del,setDel,res,setRes} = props
    const {user,logout} = useAuth()
    const [ok,setOk] = useState(false)
    

    const handlerDelete = async() => {
        setDel(false)
        setRes(await deleteEvent(id))
        
    }

    const handlerUpdate = async() => {
      setEditEvent({id,name,place,date,file,description,type,contactEmail,contactName,contactPhone,contactEmail,setlist,userOwner})
      setEditMode(true)
      setVisible("true")
    }
   

  return (
    <EventCardStyled title={setlist?'':'Warning: no setlist assigned.'}>
        
        <div>
          <h3>{name}-{setlist?'✅':'⚠️'}-{(file!=[]?'🗎':'⛔')}</h3>
          <h4>{place}</h4>
          <h4>{dateToDDMMYYYYHHMM(date)}</h4>
        </div>       
        <div>
          <button onClick={handlerUpdate} disabled={(user._id !== userOwner) || (user.role != "admin")}>✏️</button>
          <button onClick={handlerDelete} disabled={(user._id !== userOwner) || (user.role != "admin")}>🗑️</button>
        </div>
    </EventCardStyled>
  )
}

export default EventCard