import React, { memo, useDeferredValue, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'
import './Dashboard.css'
import Swal from 'sweetalert2'
import { deleteUser,update } from '../../services/user.service'
import useDeleteUserError from '../../hooks/useDeleteUserError'
import { useForm } from 'react-hook-form'
import useUpdateUserError from '../../hooks/useUpdateUserError'
import { DashboardSectionStyled, DashboardButtonDivStyled, DashboardAvatarImageSelectionStyled, DashboardAvatarThumbnailDivStyled, DashboardDivWrapperStyled, DashboardEditProfileDivStyled, DashboardRowDivStyled } from '../../ui/DashboardElements'


const Dashboard = () => {
  const [res, setRes] = useState({})
  
  const [send, setSend] = useState(false)
  const [updateOk, setUpdateOk] = useState(false)
  const [deleteOk, setDeleteOk] = useState(false)
  const [edit, setEdit] = useState(false)
  const [classInput, setClassInput] =useState("input-disabled")
  const { user, setUser,userLogin,logout } = useAuth()
  const { register, handleSubmit, errors, isSubmitting } = useForm()
  const navigate = useNavigate()
  const [chooseImg,setChooseImg] = useState(user.chooseImage)

  const handleChangePassword = () => {
    return navigate('/changePassword');
  }
   
  

  const sendEditedProfile = async(id,formData) => {

    if(edit && !isSubmitting){
   console.log(formData)
    const valuesToSend = {
      name: formData.name,
      avatar: formData.avatar,
      chooseImage: formData.chooseImg
      
    }
    if (formData.image)
    {
      valuesToSend.image = formData.image[0]
    }
    
      setSend(true)
      setRes(await update(valuesToSend))
      setSend(false)
}
  
  }

  const handleEditProfile = (formData) => {
    sendEditedProfile(user._id,formData) 

  }

  const handleDeleteUser = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonText: 'No, keep it',
    
    }).then(result => {

      result.isConfirmed ? executeDeleteUser(user._id) : console.log("user not deleted")

    })

  }

  const executeDeleteUser = async (id) => {

    setSend(true)
    setRes(await deleteUser(id))
    setSend(false)

  }

  useEffect(() => {
    localStorage.setItem('user',JSON.stringify(user))
  },[user])

  useEffect(() => {

    useDeleteUserError(res, setRes, setDeleteOk)
    useUpdateUserError(res,setRes,setUpdateOk)
    setEdit(false)
    
  },[res])

  if(updateOk)
    {
      const user = res.data.user
      const userToUpdate = localStorage.getItem('user')
      let parsedUser = JSON.parse(userToUpdate)
      parsedUser = {...parsedUser,user}
      Object.keys(user).forEach(element => {
        parsedUser = {...parsedUser,[element]: user[element]}
      });
      console.log(parsedUser)
      setUser(()=>parsedUser)
      localStorage.setItem('user',JSON.stringify(parsedUser))
      setUpdateOk(false)
    }

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
    <DashboardSectionStyled>
      <form onSubmit={handleSubmit(handleEditProfile)}>
          <DashboardDivWrapperStyled>
            <DashboardAvatarThumbnailDivStyled>
              <img className={"avatar-dashboard"} src={chooseImg? user?.image : `https://api.dicebear.com/6.x/avataaars/svg?seed=${user?.avatar}` }/>
              
              <div>                 
                <input className={classInput} type="text" name="avatar" disabled={!edit} hidden={chooseImg} placeholder={user?.avatar} {...register("avatar")}/>
              </div>
              <div> 
                <input className={classInput} type="file" name="image"  disabled={!edit} hidden={!chooseImg} placeholder={user?.image} {...register("image")}/>
              </div>
              <DashboardAvatarImageSelectionStyled>
                <h3>Avatar</h3>
                <label className={"switch"}>
                  <input type="checkbox" onClick={img2Avatar} disabled={!edit} defaultChecked={chooseImg} {...register("chooseImg")}/>
                  <span className={"slider round"}></span>
                </label>
                <h3>Image</h3>
              </DashboardAvatarImageSelectionStyled>
              
            </DashboardAvatarThumbnailDivStyled>
            <div>
              <DashboardEditProfileDivStyled>
                <h3>Edit your profile</h3>
                <label className={"switch"}>
                  <input type="checkbox" onChange={()=>setEdit(!edit)}  checked={edit}/>
                  <span className={"slider round"}></span>
                </label>
              </DashboardEditProfileDivStyled>
              <DashboardRowDivStyled>
                <label>username:</label>
                <input className={classInput} type="text" name="Name" disabled={!edit} placeholder={user?.name} {...register("name")}/>
              </DashboardRowDivStyled>
              <DashboardRowDivStyled>
                <label>Role:</label>
                <h3>{user?.role}</h3>
              </DashboardRowDivStyled>
              <DashboardRowDivStyled>                
                <label>email:</label>
                <span>{user?.email}</span>
              </DashboardRowDivStyled>
              <button onClick={handleChangePassword}>Change Password</button>
            
            </div>            
            
          </DashboardDivWrapperStyled>
                      
          <DashboardButtonDivStyled>
            <button type="submit" disabled={!edit||isSubmitting} onClick={()=>handleSubmit()}>Save Profile</button>  
          </DashboardButtonDivStyled>
        </form>
        <DashboardButtonDivStyled>            
            
            <button className={'delete'} disabled={!edit||isSubmitting} onClick={()=>handleDeleteUser()}>Delete Profile</button>
           
          </DashboardButtonDivStyled>
        
    </DashboardSectionStyled>
  )
}

export default Dashboard