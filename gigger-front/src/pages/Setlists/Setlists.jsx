import React, {useState, useEffect} from 'react'
import './Setlists.css'
import { useParams } from 'react-router'
import { getAllSetlistsPaginated } from '../../services/setlists.service'
import { socket } from '../../socket'
import SetlistCard from '../../components/SetlistCard/SetlistCard'
import { getAllSongs } from '../../services/songs.service'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import SetlistForm from '../../components/setlistForm/setlistForm'
import { getAllTags } from '../../services/tags.service'
import { SetlistMainSectionStyled, SetlistMainStyled } from '../../ui/SetlistElements'
import { ModalWrapperStyled } from '../../ui/ModalElements'
import { NumberOfSetlistStyled, OpenModalStyled } from '../../ui/BubbleElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

const Setlists = () => {
    const { pageReq } = useParams()    
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const [setlists, setSetlists] = useState([])
    const [songs,setSongs] = useState([])
    const [tagList,setTagList] = useState([])
    // const [setlist,setSetlist] = useState({})
    const [page, setPage] = useState(()=>
        pageReq ? parseInt(pageReq) : 1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginator, setPaginator] = useState([])
    const [res,setRes] = useState()
    const [visible, setVisible] =useState("false")
    const [editMode,setEditMode] =useState(false)
    const [editSetlist,setEditSetlist] = useState({})

    useEffect(() => {

      const pages = []
      for(let i = 1; i <= totalPages; i++){
        pages.push(<button key={i} onClick={()=>setPage(i)}>{i}</button>)
      }
      setPaginator(pages)


    },[setlists])

    useEffect(()=>{
      
      const getTags = async ()=> {
        const tags = await getAllTags()
        setTagList(tags.data?.tags)
      }

      getTags()
      
    },[])

   
    useEffect(()=>{
        const getSetlists = async()=> {
            const resSetlist = await getAllSetlistsPaginated(page)
            
            if(songs?.length == 0){
              const resSongs = await getAllSongs()
              setSongs(resSongs?.data?.songs)
              
            }
            
            setSetlists(resSetlist.data.setlists)
            setTotalPages(resSetlist.data.totalPages)
        }

        getSetlists()
    },[page,res])




  return (
    
    <SetlistMainStyled className={'main-setlist'}>
      <NumberOfSetlistStyled>
        <h3>Setlists:</h3> <h2>{setlists?.length}</h2>
      </NumberOfSetlistStyled>
      
      <SetlistMainSectionStyled>
        <nav>{paginator.map((page)=>page)}</nav>
        <section ref={parent}>
          {
            setlists?.length>0 ? setlists.map(setlist => <SetlistCard setVisible={setVisible} setEditSetlist={setEditSetlist} setEditMode={setEditMode} res={res} setRes={setRes} setlistOwner={setlist.user} tags={tagList} id={setlist._id} songList={songs} key={setlist._id} name={setlist.name} songs={setlist.songs} events={setlist.events} description={setlist.description} favouritedBy={setlist.favouritedBy}/>) :"No setlist at all 😞"
          }
        </section>
      </SetlistMainSectionStyled>
      <ModalWrapperStyled visible={visible}>
        <SetlistForm setEditMode={setEditMode} editMode={editMode} editSetlist={editSetlist} setEditSetlist={setEditSetlist} tags={tagList} setlists={setlists} res={res} setRes={setRes} setSetlists={setSetlists} visible={visible} setVisible={setVisible} editMode={editMode} setEditMode={setEditMode}/>
      </ModalWrapperStyled>
      
      
      <OpenModalStyled onClick={()=>setVisible(visible=="true"?"false":"true")}><FontAwesomeIcon icon={faPlusSquare}/></OpenModalStyled>
    </SetlistMainStyled>
  )
}

export default Setlists