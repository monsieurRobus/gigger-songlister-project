import { toast } from 'sonner'


export const useSongsError = (res,setOk,setRes, logout) => {
   
    if(res.response?.status == 500 && res?.response?.data?.includes('jwt expired'))
    {
        logout()
        return toast.error("token expired, please, login again")
        
    }

    if(res.response?.status == 405 && res?.response?.data?.message.includes('admin users'))
    {
        return toast.error("You have no permissions to add, delete or edit any tags. Contact your band admin.")
    }

    if(res.status == 200 && res?.data?.message?.includes("saved"))
    {
        setOk(() => true)
        return toast.success(res.data.message)
        
    }
    if(res.status == 200 && res?.data?.message?.includes("deleted"))
    {
        
        setOk(() => true)
        return toast.success(res.data.message)
        
    }
    if(res.status == 200 && res?.data?.message?.includes("already been added"))
    {
        
        setOk(() => true)
        return toast.error(res.data.message)
        
    }

    
    
}

