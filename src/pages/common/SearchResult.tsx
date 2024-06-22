import Header from "@/components/common/users/Header";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SearchResult : React.FC = () => {

    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState <string> ("")

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const query = params.get("query") || ""
        setSearchQuery(query)

        
    }, [location.search])
    
    

    return (
        <>
            <Header /> 
            <div className="min-h-screen max-w-7xl mx-auto" >
                <div className="flex " >
                    <h2 className="text-3xl font-bold" >Search Result:</h2>

                </div>
            </div>
        </>
    )
}