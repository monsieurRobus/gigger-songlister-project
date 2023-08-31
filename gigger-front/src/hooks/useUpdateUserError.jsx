import Swal from "sweetalert2"



const useUpdateUserError = (res, setRes, setOk) => {
    if(res?.status == 200 && res?.data?.updated?.toString() === "true")
    {
    
       setOk(()=>true)
        return Swal.fire({
            icon: "success",
            title: "user updated succesfully ✅",
            showConfirmButton: false,
            timer: 1500,
          });
            
    }
    

}

export default useUpdateUserError