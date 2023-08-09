import React, {useState, useEffect} from 'react'
import './Tags.css'
import { useParams } from 'react-router'
import { getAllTagsPaginated } from '../../services/tags.service'

const Tags = () => {
    const { pageReq } = useParams()
    const [tags, setTags] = useState([])
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])

    useEffect(()=>{
        const getTags = async()=> {
            const res = await getAllTagsPaginated(page)
            setTags(res.data.tags)
            setTotalPages(res.data.totalPages)
        }

        getTags()
    },[page])
  return (
    <div>Tags</div>
  )
}

export default Tags