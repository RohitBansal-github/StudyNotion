import toast from "react-hot-toast"
import { profileEndpoints } from "../api"
import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector";

const { GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints;

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...");

    let result = [];
    try {

        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.data;
    }
    catch (error) {
        console.log("Could not get the enrolled data", error);
        toast.error("can't get the enrolled courses")
    }
    toast.dismiss(toastId);
    return result;

}


export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");

    let result = [];

    try {

        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })

        console.log("GET_INSTRUCTOR_DATA_API_RESPONSE",response);

        result = response?.data?.courses

    }
    catch (error) {
        console.log("GET_INSTRUCTOR_API ERROR", error);
        toast.error("could not Get the Instructor Data");
    }
    toast.dismiss(toastId);
    return result;
}