import { format, formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext";

export default function PostInfoPage(){
    const {id} = useParams();
    const [postInfo,setPostInfo]=useState(null);
    const {userInfo}=useContext(UserContext);
    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response=>{
            response.json().then(data=>{
                setPostInfo(data);
            })
        })

    },[]);

    if(!postInfo)return '';

    return(
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            <div className="post-image">
                <img src={`http://localhost:4000/${postInfo.cover}`}/>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    )











}