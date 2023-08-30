import React, {useState, useEffect} from 'react'
import './Tags.css'
import { useParams } from 'react-router'
import { deleteTag, getAllTagsPaginated, getTagById } from '../../services/tags.service'
import TagForm from '../../components/tagForm/tagForm'
import TagBubble from './TagBubble'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TagsMainStyled, TagsSectionWrapperStyled, TagBubbleColourStyled, TagsTableStyled } from '../../ui/TagsElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faCircleDot, faSquare, faPenToSquare, faTrashCan, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import GeneralButtonElement from '../../ui/GeneralButtonElement'
import { useAuth } from '../../hooks/AuthContext'
import Swal from 'sweetalert2'
import { ModalWrapperStyled } from '../../ui/ModalElements'
import { OpenModalStyled } from '../../ui/BubbleElements'

const Tags = () => {

  
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const { pageReq } = useParams()
  const [tags, setTags] = useState([])
  const [allowDeleteTag,setAllowDeleteTag] = useState(true)
  const [page, setPage] = useState(()=>
      pageReq ? parseInt(pageReq) : 1)
  const [totalPages, setTotalPages] = useState(1)
  const [paginator, setPaginator] = useState([])
  const [visible,setVisible] = useState("false")
  const [editMode,setEditMode] = useState(false)
  const [editTag,setEditTag] = useState({})
  const [res,setRes] = useState({})
  const {user} = useAuth()

  const handleEditMode = (e) => {
    
    setEditTag(tags.filter(tag=> e.target.id === tag._id))
    
    setEditMode(true)    
    setVisible("true")
  }

  const handleDelete = async(e) => {
      const id = e.target.id
      console.log(id)
    const executeDelete = async(id) => {
      
      const respTag = await getTagById(id)

      if(respTag.data.tag.song.length > 0)
      {
        Swal.fire({
          title: 'This tag has songs associated.',
          text: "If you proceed, this tag will be deleted from songs",
          icon: 'info',
          confirmButtonText: 'Yes, delete it!',
          showCancelButton: true,
          cancelButtonText: 'No, keep it',
        
        }).then(async result => 
    
          result.isConfirmed ? setRes(await deleteTag(id))  : console.log("do not delete tag")
          
        )
      }
      else {
        setRes(await deleteTag(id))
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

      result.isConfirmed ? executeDelete(id) : console.log("do not delete song")
      
    )

  
    

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
    },[totalPages])
   
  return (
    <TagsMainStyled>
    <h1>Tag list</h1>
    <TagsSectionWrapperStyled>
      
      <TagsTableStyled >
        <thead>
          <tr>
            <th className={'name-column'}>Name</th>
            <th>Description</th>
            <th className={'color-column'}>Colors</th>
            { user.role == "admin" && <th>Options</th>}
          </tr>
        </thead>
        <tbody ref={parent}>
      {tags.map(
        tag => 
          <tr key={tag._id}>
            <td className={'name-column'}>{tag.name}</td>
            <td>{tag.description}</td>
            <td className={'color-column'}>{tag.color}<TagBubbleColourStyled color={tag.color}><FontAwesomeIcon icon={faSquare}/></TagBubbleColourStyled></td>
            {user.role == "admin" && <td className={'options-column'}>
              <GeneralButtonElement handleClick={handleEditMode} id={tag._id} type={'secondary'} label={<FontAwesomeIcon icon={faPenToSquare}/>}/>
              <GeneralButtonElement handleClick={handleDelete} type={'primary'} id={tag._id} songs={tag.song} label={<FontAwesomeIcon icon={faTrashCan}/>}/>
            </td>}
          </tr>
          )}
          </tbody>
      </TagsTableStyled>
      
    </TagsSectionWrapperStyled>
      
    <nav>{paginator.map((page)=>page)}</nav>
      <ModalWrapperStyled visible={visible} ><TagForm editTag={editTag} setEditMode={setEditMode} editMode={editMode} visible={visible} setVisible={setVisible} tags={tags} setTags={setTags} res={res} setRes={setRes}/></ModalWrapperStyled>
      <OpenModalStyled onClick={()=>setVisible(visible=="true"?"false":"true")}><FontAwesomeIcon icon={faPlusSquare}/></OpenModalStyled>
    </TagsMainStyled>
  )
}

export default Tags