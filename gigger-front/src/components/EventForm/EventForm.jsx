import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { useForm } from 'react-hook-form'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import { addNewEvent, getAllEvents, updateEvent } from '../../services/events.service';
import { useEventsError } from '../../hooks/useEventsError';
import { getAllSetlists } from '../../services/setlists.service';
import { ModalCloseButton, ModalContentFormStyled, ModalContentStyled, ModalSectionStyled, ModalSectionStyled2, ModalSectionWrapperStyled } from '../../ui/ModalElements';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventForm = (props) => {


    const {user,logout} = useAuth()
    const {events,setEvents,res,setRes,setVisible,editMode,setEditMode,editEvent,setEditEvent} = props
    const [setlists,setSetlists] = useState([])
    const {register,error,handleSubmit,reset,setValue} = useForm()
    const [send,setSend] = useState(false)
    const [date,setDate] = useState(new Date())
    const [ok,setOk] = useState(false)


    const handleEditEvent = async(formData) => {
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
        setSend(true)
        setRes(await updateEvent(valuesToSend,editEvent.id))
        setSend(false)
        closeForm()
    }

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
        closeForm()

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
        closeForm()
        reset()
    
    },[res])
    
    useEffect(()=>{

        const getSetlists = async()=> {
            const res = await getAllSetlists()
            
            setSetlists(res.data.setlist)
        }

        getSetlists()


    },[])

    const closeForm = () => {
        setVisible("false")
        setEditMode(false)
        reset()
    }
    

    useEffect(()=>{
        if(editMode)
        {
            setValue("name",editEvent.name)
            setValue("type",editEvent.type)
            setDate(editEvent.date)
            setValue("place",editEvent.place)
            setValue("contactName",editEvent.contactName)
            setValue("contactPhone",editEvent.contactPhone)
            setValue("contactEmail",editEvent.contactEmail)
            setValue("description",editEvent.description)
        }
    
    },
   
    [editEvent])
   
  return (
    <ModalContentStyled className={'modal-styles event-editor'}>
    <h1>Event editor</h1>
        {user.role==="admin"? <ModalContentFormStyled className={'modal-styles'} onSubmit={editMode?handleSubmit(handleEditEvent):handleSubmit(handleAddEvent)}>
        <ModalCloseButton className={'modal-close'} onClick={closeForm}><FontAwesomeIcon icon={faCircleXmark}/></ModalCloseButton>
            <ModalSectionWrapperStyled>
            
                <ModalSectionStyled2>
                <h4>Datos del evento</h4>
                <div className={'horizontal'}>
                    <label>Nombre evento</label><input type="text" name="event-name" {...register("name")}/>
                        <label>Tipo</label>
                        <select type="text" name="event-type" {...register("type")}>
                                <option value="boda" defaultValue={1}>Boda</option>
                                <option value="privada">Fiesta privada</option>
                                <option value="concierto">Concierto</option>
                                <option value="otros">Otros</option>
                        </select>
                </div>
                <div className={'horizontal'}>
                        <label>Localización</label><input type="text" name="event-place" {...register("place")}/>
                               
                </div>
                <div>
                        <label>Fecha</label>
                        <DateTimePicker onChange={setDate} value={date}/>
                    </div>     
                    
                    <label>Descripcion</label><input type="text" name="event-description" {...register("description")}/>
                </ModalSectionStyled2>
            
            <ModalSectionStyled2>
            <h4>Datos de contacto</h4>
                
                <label>Contacto</label><input type="text" name="event-contact-name" {...register("contactName")}/>
                <label>Teléfono</label><input type="text" name="event-contact-phone" {...register("contactPhone")}/>
                <label>eMail</label><input type="text" name="event-contact-email" {...register("contactEmail")}/>
            </ModalSectionStyled2>
            </ModalSectionWrapperStyled>
            <ModalSectionWrapperStyled>
            <ModalSectionStyled>
            <label>Archivos de interés</label><input type="file" name="files" {...register("files")}/>
            </ModalSectionStyled>
            <ModalSectionStyled2>
                <div>
                <label>Setlist a elegir</label>
                <select {...register("setlist")}>
                    {setlists && setlists.map(setlist=>{
                        return <option key={setlist._id} value={setlist._id}>{setlist.name}</option>
                    })}
                </select>
                </div>
            </ModalSectionStyled2>                
            
            </ModalSectionWrapperStyled>
                
            <input disabled={send} type="submit" />
        </ModalContentFormStyled>: null}
    </ModalContentStyled>
  )
}

export default EventForm