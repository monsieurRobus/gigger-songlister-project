import { toast } from 'sonner'


export const useEventsError = (res,setOk,setRes, logout) => {
   
    if(res.response?.status == 500 && res?.response?.data?.includes('jwt expired'))
    {
        logout()
        return toast.error("token expired, please, login again")
        
    }

    if(res.response?.status == 405 && res?.response?.data?.message?.includes('admin users'))
    {
        return toast.error("You have no permissions to add, delete or edit any tags. Contact your band admin.")
    }
    if(res.response?.status == 404 && res?.response?.data?.message?.includes('No type has been selected'))
    {
        return toast.error(res.response.data.message)
    }

    if(res.status == 200 && res?.data?.message?.includes("saved"))
    {
        setOk(() => true)
        return toast.success("event saved")
        
    }
    if(res.status == 200 && res?.data.deleted)
    {
        
        setOk(() => true)
        return toast.success("Event deleted")
        
    }
    
    
    
}

