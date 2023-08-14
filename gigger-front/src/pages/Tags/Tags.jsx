import React, {useState, useEffect} from 'react'
import './Tags.css'
import { useParams } from 'react-router'
import { getAllTagsPaginated } from '../../services/tags.service'
import TagForm from '../../components/tagForm/tagForm'
import TagBubble from './TagBubble'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Tags = () => {

  
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const { pageReq } = useParams()
  const [tags, setTags] = useState([])
  const [allowDeleteTag,setAllowDeleteTag] = useState(true)
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
    },[])

   
  return (
    <main>
      <h1>Song Tags</h1>
      <section ref={parent} className={'tag-list'}>
        {tags && tags.map(tag => <TagBubble description={tag?.description} color={tag?.color} del={allowDeleteTag} setDel={setAllowDeleteTag} page={page} tags={tags} setTags={setTags} id={tag._id} key={tag._id} name={tag.name}></TagBubble>)}
      </section>
      <TagForm tags={tags} setTags={setTags}/>
    </main>
  )
}

export default Tags