import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { useForm } from 'react-hook-form'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import { addNewEvent, getAllEvents } from '../../services/events.service';
import { useEventsError } from '../../hooks/useEventsError';
import { getAllSetlists } from '../../services/setlists.service';

const EventForm = (props) => {


    const {user,logout} = useAuth()
    const {events,setEvents,res,setRes} = props
    const [setlists,setSetlists] = useState([])
    const {register,error,handleSubmit,reset} = useForm()
    const [send,setSend] = useState(false)
    const [date,setDate] = useState(new Date())
    const [ok,setOk] = useState(false)
    const handleAddEvent = async(formData) => {
        console.log(formData.setlist)
        const valuesToSend = {
            file: formData.files[0],
            name: formData.name,
            date: date,
            setlist: formData.setlist,
            type: formData.type,
            place: formData.place,
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

    useEffect(()=>{

        useEventsError(res,setOk,setRes,logout)
        reset({
            name: "",
            description: "",
            notes: "", 
            place: "",
            type: ""       
        })
        setDate(new Date())
    
    },[res])
    
    useEffect(()=>{

        const getSetlists = async()=> {
            const res = await getAllSetlists()
            
            setSetlists(res.data.setlist)
        }

        getSetlists()


    },[])
   
  return (
    <div>
        {user.role==="admin"? <form onSubmit={handleSubmit(handleAddEvent)}>
            <div>
                <label>Nombre evento</label><input type="text" name="event-name" {...register("name")}/>
                <label>Tipo</label>
                <select type="text" name="event-type" {...register("type")}>
                        <option value="boda" selected>Boda</option>
                        <option value="privada">Fiesta privada</option>
                        <option value="concierto">Concierto</option>
                        <option value="otros">Otros</option>
                </select>
                <label>Descripcion</label><input type="text" name="event-description" {...register("description")}/>
                <label>Localización</label><input type="text" name="event-place" {...register("place")}/>
                <label>Contacto</label><input type="text" name="event-contact-name" {...register("contactName")}/>
                <label>Teléfono</label><input type="text" name="event-contact-phone" {...register("contactPhone")}/>
                <label>eMail</label><input type="text" name="event-contact-email" {...register("contactEmail")}/>
                <label>Archivos de interés</label><input type="file" name="files" {...register("files")}/>
                <label>Setlist a elegir</label>
                <select {...register("setlist")}>
                    {setlists && setlists.map(setlist=>{
                        return <option key={setlist._id} value={setlist._id}>{setlist.name}</option>
                    })}
                </select>
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