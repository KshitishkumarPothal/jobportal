// const { useSession } = require("@clerk/clerk-react");
// const { useState } = require("react")

import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb,option ={} ) =>{
    const [data, setData] = useState(undefined);
    const [loading,setLoaing] = useState(null);
    const [error, setError] = useState(null);

    const {session} = useSession();

    const fn = async(...args) =>{
        setLoaing(true);
        setError(null);

        try {
            const superbaseAccessToken = await session.getToken({
                template: "supabase",
            });
           const response =await cb(superbaseAccessToken,option, ...args);
           setData(response);
           setError(null);
            
        } catch (error) {
            setError(error);
            
        }finally{
            setLoaing(false);
        }

    }

    return {fn, data, loading, error};



};

export default useFetch;