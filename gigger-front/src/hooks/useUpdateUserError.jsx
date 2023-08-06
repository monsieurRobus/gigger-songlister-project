import Swal from "sweetalert2"



const useUpdateUserError = (res, setRes, setOk) => {
    console.log(res)
    if(res?.data?.updated?.toString() == "true")
    {
        setOk(()=> true)
        return Swal.fire({
            icon: "success",
            title: "user updated succesfully ✅",
            showConfirmButton: false,
            timer: 1500,
          });
            
    }
}

export default useUpdateUserError