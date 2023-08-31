import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { SetlistBackgroundStyled, SetlistBandBackgroundStyled, SetlistCardStyled } from '../../ui/SetlistCardElement'
import { deleteSetlist, favSetlist } from '../../services/setlists.service'
import Swal from 'sweetalert2'
import { SetlistBodyCardStyled, SetlistFooterButtonsStyled } from '../../ui/SetlistElements'

const SetlistCard = (props) => {
    const {name,description,favouritedBy,songs,songList,id,setlistOwner,res,setRes,events,setVisible,setEditMode,setEditSetlist} = props
    const {user} = useAuth()
    const [favourited,setFavourited] = useState(false)
    const [send,setSend] = useState(false)



    const handleEdit =  () => {

        setEditSetlist({name,description,songs,id})        
        setEditMode(true)    
        setVisible("true")
    
      }


    const favUnfav = async() => {

        const valuesToSend = {
            setlistId: id
        }

        setSend(true)
        setRes(await favSetlist(valuesToSend))
        setSend(false)
    }

    useEffect(()=>{
        if(res?.data?.message?.includes("setlist faved") && (res?.data?.setlist === id))
            setFavourited(true)
        
        if(res?.data?.message?.includes("setlist unfav") && (res?.data?.setlist === id))
            setFavourited(false)

    },[res])
    
    useEffect(()=>{

       
                favouritedBy == user._id ? setFavourited(true) : setFavourited(false)
           


    },[])

    
    const deleteSetlistQuestion = () => {


        const executeDelete = async() => {
            
            if(events.length >0){
                Swal.fire({
                    title: 'Attention!',
                    text: "This setlist is assigned to an event. Do you want to proceed?",
                    icon: 'info',
                    confirmButtonText: 'Yes, go on!',
                    showCancelButton: true,
                    cancelButtonText: 'No, my bad!',
                
                }).then(async result => 
            
                    result.isConfirmed ? setRes(await deleteSetlist(id)) : console.log("do not delete song")
                    
                )
                
                }
                else 
                {
                    setRes(await deleteSetlist(id))
                }
        }
    
    
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true,
            cancelButtonText: 'No, keep it',
          
          }).then(async result => 
      
            result.isConfirmed ? executeDelete() : console.log("do not delete song")
            
          )
    }

  return (
    <SetlistCardStyled>
        <SetlistBackgroundStyled className={'setlist-card-background'} />           
        
        <SetlistBodyCardStyled>
            <h1>{name}</h1>
            <p>{description}</p>            
            <label>Songs: {songs.length}</label>            
            
        </SetlistBodyCardStyled>
        <SetlistFooterButtonsStyled>
            <button onClick={handleEdit} disabled={user.role!="admin" || user._id != setlistOwner}>✏️</button>{favourited ? <button onClick={favUnfav}>💗</button> : <button onClick={favUnfav}>🖤</button> }<button onClick={deleteSetlistQuestion} disabled={user.role!="admin" || user._id != setlistOwner}>🗑️</button>
        </SetlistFooterButtonsStyled>
    </SetlistCardStyled>
  )
}

export default SetlistCard