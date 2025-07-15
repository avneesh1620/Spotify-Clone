import { createContext } from "react";
import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = url

export const AdminContext = createContext()

export const AdminProvider = ({children}) => {

    const value = {
        axios,
    }

    return(
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )

}