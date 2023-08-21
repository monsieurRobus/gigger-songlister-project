import React, { useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { useForm } from 'react-hook-form'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import { addNewEvent } from '../../services/events.service';

const EventForm = (props) => {


    const {user} = useAuth()
    const {searchBox,setSearchBox,InputSearchBox} = props
    const {register,error,handleSubmit,reset} = useForm()
    const [send,setSend] = useState(false)
    const [res,setRes] = useState(false)
    const [date,setDate] = useState(new Date())

    const handleAddEvent = async(formData) => {
        const valuesToSend = {
            name: formData.name,
            date: date,
            description: formData.description,
            contactName: formData.contactName,
            contactPhone: formData.contactPhone,
            contactEmail: formData.contactEmail
        }
        console.log(valuesToSend)
        setSend(true)
        setRes(await addNewEvent(valuesToSend))
        setSend(false)
    }

  return (
    <div>
        {user.role==="admin"? <form onSubmit={handleSubmit(handleAddEvent)}>
            <div>
                <label>Nombre evento</label><input type="text" name="event-name" {...register("name")}/>
                <label>Descripcion</label><input type="text" name="event-description" {...register("description")}/>
                <label>Contacto</label><input type="text" name="event-contact-name" {...register("contactName")}/>
                <label>Teléfono</label><input type="text" name="event-contact-phone" {...register("contactPhone")}/>
                <label>eMail</label><input type="text" name="event-contact-email" {...register("contactEmail")}/>
            </div>
            <div>
                <label>Fecha</label>
                <DateTimePicker onChange={setDate} value={date}/>
            </div>
            
            
            <input disabled={send} type="submit" />
        </form>: null}
    </div>
  )
}

export default EventForm