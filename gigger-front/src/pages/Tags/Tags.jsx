import React, {useState, useEffect} from 'react'
import './Tags.css'
import { useParams } from 'react-router'
import { deleteTag, getAllTagsPaginated } from '../../services/tags.service'
import TagForm from '../../components/tagForm/tagForm'
import TagBubble from './TagBubble'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TagsMainStyled, TagsSectionWrapperStyled, TagBubbleColourStyled, TagsTableStyled } from '../../ui/TagsElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faCircleDot, faSquare, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import GeneralButtonElement from '../../ui/GeneralButtonElement'
import { useAuth } from '../../hooks/AuthContext'

const Tags = () => {

  
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const { pageReq } = useParams()
  const [tags, setTags] = useState([])
  const [allowDeleteTag,setAllowDeleteTag] = useState(true)
  const [page, setPage] = useState(()=>
      pageReq ? parseInt(pageReq) : 1)
  const [totalPages, setTotalPages] = useState(1)
  const [paginator, setPaginator] = useState([])
  const [res,setRes] = useState({})
  const {user} = useAuth()
  
  const handleDelete = async(e) => {
    
    const deleteId = e.target.id
    setRes(await deleteTag(deleteId))
    

}

  useEffect(() => {

    const pages = []
    for(let i = 1; i <= totalPages; i++){
      pages.push(<button key={i} onClick={()=>setPage(i)}>{i}</button>)
    }
    setPaginator(pages)


  },[tags])

    useEffect(()=>{
        const getTags = async()=> {
            const resTags = await getAllTagsPaginated(page)
            setTags(resTags.data.tags)
            setTotalPages(resTags.data.totalPages)
        }
        getTags()
      
    },[page,res])

    useEffect(()=>{
      
      setPage(totalPages)
    },[res])
   
  return (
    <TagsMainStyled>
    <h1>Tag list</h1>
    <TagsSectionWrapperStyled>
      
      <TagsTableStyled ref={parent}>
        <thead>
          <tr>
            <th className={'name-column'}>Name</th>
            <th>Description</th>
            <th className={'color-column'}>Colors</th>
            { user.role == "admin" && <th>Options</th>}
          </tr>
        </thead>
        <tbody >
      {tags && tags.map(
        tag => 
          <tr key={tag._id}>
            <td className={'name-column'}>{tag.name}</td>
            <td>{tag.description}</td>
            <td className={'color-column'}>{tag.color}<TagBubbleColourStyled color={tag.color}><FontAwesomeIcon icon={faSquare}/></TagBubbleColourStyled></td>
            {user.role == "admin" && <td className={'options-column'}>
              <GeneralButtonElement type={'secondary'} label={<FontAwesomeIcon icon={faPenToSquare}/>}/>
              <GeneralButtonElement handleClick={handleDelete} type={'primary'} id={tag._id} label={<FontAwesomeIcon icon={faTrashCan}/>}/>
            </td>}
          </tr>
          )}
          </tbody>
      </TagsTableStyled>
      
    </TagsSectionWrapperStyled>
      
    <nav>{paginator.map((page)=>page)}</nav>
      <TagForm tags={tags} setTags={setTags} res={res} setRes={setRes}/>
    </TagsMainStyled>
  )
}

export default Tags