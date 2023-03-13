import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink, useHistory, useLocation } from "react-router-dom";
import SubrandPageComponent from "../SubrandPage";

import "./SearchedSubs.css";

function SearchedSubsComponent() {

    const [subranddits, setSubranddits] = useState([]);
    const location = useLocation();
    let url = new URL(window.location.href)

    const searchParams = url.searchParams
    const searchInput = searchParams.get('input')


    let test = async () => {
        let response = await fetch(`/api/subranddits/query?search=${searchInput}`)
        setSubranddits(await response.json())
    }

    useEffect(() => {
        test()
    }, [location])

    return (
        <>
            {subranddits.length ? <h1 className="title-search">Search Results For: {searchInput}</h1> : <h1 className="title-search">No Results</h1>}
            {console.log("------------------------")}
            <div className="whole-subranddit">
                {subranddits.map((subranddit) => {
                    return <div className="searched-subs">
                        <Link to={`/r/${subranddit.id}`}>
                            <SubrandPageComponent subranddit={subranddit} />
                        </Link>
                    </div>
                })}
            </div>
        </>
    )
}

export default SearchedSubsComponent;
