import toast from "react-hot-toast"
import {profileEndpoints} from "../api"
import {setLoading,setUser} from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector";

const {GET_USER_ENROLLED_COURSES_API} = profileEndpoints;

export async function getUserEnrolledCourses(token){
    const toastId=toast.loading("Loading...");

    let result=[];
    try{
        
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization:`Bearer ${token}`,
            }
        )

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result=response.data.data;
    }
    catch(error){
        console.log("Could not get the enrolled data",error);
        toast.error("can't get the enrolled courses")
    }
    toast.dismiss(toastId);
    return result;

}