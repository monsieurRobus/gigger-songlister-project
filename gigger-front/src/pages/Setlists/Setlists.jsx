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

    useEffect(() => {

      const pages = []
      for(let i = 1; i <= totalPages; i++){
        pages.push(<button key={i} onClick={()=>setPage(i)}>{i}</button>)
      }
      setPaginator(pages)


    },[setlists])

    useEffect(()=>{
        const getSetlists = async()=> {
            const res = await getAllSetlistsPaginated(page)
            const tags = await getAllTags()
            if(songs?.length == 0){
              const resSongs = await getAllSongs()
              setSongs(resSongs?.data?.songs)
              
            }
            setTagList(tags)
            setSetlists(res.data.setlists)
            setTotalPages(res.data.totalPages)
        }

        getSetlists()
    },[page,res])
  return (
    <main className={'main-setlist'}>
      <nav>{paginator.map((page)=>page)}</nav>
      <section ref={parent}>
        {
          setlists && setlists.map(setlist => <SetlistCard res={res} setRes={setRes} setlistOwner={setlist.user} tags={tagList} id={setlist._id} songList={songs} key={setlist._id} name={setlist.name} songs={setlist.songs} description={setlist.description} favouritedBy={setlist.favouritedBy}/>)
        }
      </section>
      <SetlistForm tags={tagList} setlists={setlists} setSetlists={setSetlists} />
      
      
    </main>
  )
}

export default Setlists