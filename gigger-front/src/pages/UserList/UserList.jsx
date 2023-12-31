import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { getAllUsers, getAllUsersPaginated } from '../../services/user.service'
import { useParams } from 'react-router-dom'
import UserCard from '../../components/UserCard/UserCard'
import './UserList.css'
import { UserListSectionStyled } from '../../ui/UserListStyled'
const UserList = () => {
    const { pageReq } = useParams()
    const [users, setUsers] = useState([])
    const { user } = useAuth()
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])
    const [res,setRes] = useState({})

    useEffect(() => {

        const getUsers = async () => {
            const res = await getAllUsersPaginated(page)
            setUsers(res.data.users)
            setTotalPages(res.data.totalPages)
        }

        getUsers()

    },[page,res])

    useEffect(() => {

      const pages = []
        for(let i = 1; i <= totalPages; i++){
          pages.push(<button key={i} onClick={()=>setPage(i)}>{i}</button>)
        }

      setPaginator(pages)

    },[users])
 

  return (
    <UserListSectionStyled>
      Soy usuario tipo: {user.role}
      <nav>{paginator.map((page)=>page)}</nav>
      <div className={'user-list'}>        
        {users.map((user) => (
          <UserCard key={user._id} image={user.image} chooseImage={user.chooseImage} isActive={user.active} id={user._id} name={user.name} role={user.role} avatar={user.avatar} res={res} setRes={setRes}/>
        ))}
      </div>
    </UserListSectionStyled>
  )
}
export default UserList