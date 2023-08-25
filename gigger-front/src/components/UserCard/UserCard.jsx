import React, { useEffect, useState } from 'react'
import './UserCard.css'
import { CloseButtonStyled } from '../../ui/BubbleElements'
import { useAuth } from '../../hooks/AuthContext'
import Swal from 'sweetalert2'
import { deleteUser } from '../../services/user.service'
import useDeleteUserError from '../../hooks/useDeleteUserError'

const UserCard = ({name,role,avatar,id,res,setRes,isActive}) => {
  const {user,logout} = useAuth()
  
  const shouldBeRemoved = () => {
    const result =  (user.role=="admin" && user._id != id && role!="admin") ? true : false
    return result
  }

  const handlerDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonText: 'No, keep it',
    
    }).then(async result => 

      result.isConfirmed ? setRes(await deleteUser(id)) : console.log("user not deleted")
      
    )
  }

  useEffect(()=>{

    useDeleteUserError(res,setRes)

  },[res])

  return (
    <figure className={'user-card'}>
      <div>{shouldBeRemoved()?<CloseButtonStyled onClick={handlerDelete}>✖️</CloseButtonStyled>:null}</div>
        <h2>{name}</h2>
        <h2>{role}</h2>
        <img src={avatar} alt="user avatar"/>
        <div>Status {isActive?<span>🟢</span>:<span>🔴</span>}</div>
    </figure>
  )
}

export default UserCard