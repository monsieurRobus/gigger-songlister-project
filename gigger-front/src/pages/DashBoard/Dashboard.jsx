import React, { useDeferredValue, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'
import './Dashboard.css'
import Swal from 'sweetalert2'
import { deleteUser,update } from '../../services/user.service'
import useDeleteUserError from '../../hooks/useDeleteUserError'
import { useForm } from 'react-hook-form'
import useUpdateUserError from '../../hooks/useUpdateUserError'


const Dashboard = () => {
  const [res, setRes] = useState({})
  
  const [send, setSend] = useState(false)
  const [updateOk, setUpdateOk] = useState(false)
  const [deleteOk, setDeleteOk] = useState(false)
  const [edit, setEdit] = useState(false)
  const [classInput, setClassInput] =useState("input-disabled")
  const { user, userLogin,logout } = useAuth()
  const { register, handleSubmit, errors } = useForm()
  const navigate = useNavigate()
  const [chooseImg,setChooseImg] = useState(false)

  const handleChangePassword = () => {
    return navigate('/changePassword');
  }
   
  

  const sendEditedProfile = async(id,formData) => {

    const valuesToSend = {
      name: formData.name,
      avatar: formData.avatar
    }
    
    setSend(true)
    setRes(await update(valuesToSend))
    setSend(false)


  }

  const handleEditProfile = (formData) => {

    edit ? sendEditedProfile(user._id,formData) : null

  }

  const onFormErrors = (errors) => {}

  const handleDeleteUser = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonText: 'No, keep it',
    
    }).then(result => {

      executeDeleteUser(user._id)

    })

  }

  const executeDeleteUser = async (id) => {

    setSend(true)
    setRes(await deleteUser(id))
    setSend(false)

  }

  useEffect(() => {
    setChooseImg(user.chooseImage)
    console.log(chooseImg)
  },[user])

  useEffect(() => {

    // useDeleteUserError(res, setRes, setDeleteOk)
    useUpdateUserError(res,setRes,setUpdateOk)
  },[res])

  if(deleteOk) {
    logout()
    userLogin(null)
    localStorage.removeItem('user')
    
    return <Navigate to="/login" />
  }

  const img2Avatar = ()=> {
    setChooseImg(!chooseImg)
  }
 
  return (
    <section>
      <form onSubmit={handleSubmit(handleEditProfile)}>
          <div>
          
            <label>username:</label>
            <input className={classInput} type="text" name="Name" disabled={!edit} placeholder={user?.name} {...register("name")}/>
            <label>email:</label>
            <span>{user?.email}</span>
            <button onClick={handleChangePassword}>Change Password</button>
            <label className={"switch"}>
              <input type="checkbox" onClick={img2Avatar} value={chooseImg}/>
              <span className={"slider round"}></span>
            </label>
          </div>
          <div>
            <img className={"avatar-dashboard"} src={chooseImg? user?.image : user?.avatar }/>
            <label>avatar:</label>
            <div> <input className={classInput} type="text" name="avatar" disabled={!edit} hidden={chooseImg} placeholder={user?.avatar} {...register("avatar")}/></div>
            <div> <input className={classInput} type="file" name="image"  hidden={!chooseImg} placeholder={user?.image} {...register("image")}/></div>
            
            <label>Role:</label>
            <h3>{user?.role}</h3>
            <button onClick={()=>handleEditProfile} >Save Profile</button>
            <button onClick={()=>setEdit(!edit)}>Edit</button>
            {/* <button onClick={handleDeleteUser} className={'delete-button'} disabled={!edit}>Delete User</button>           */}
            
          </div>
        </form>
    </section>
  )
}

export default Dashboard