import { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]
export default function CreatePostPage (){
    const [title,setTitle]=useState('')
    const [summary,setSummary]=useState('')
    const [content,setContent]=useState('')

    return(
        <form>
            <input type="title" placeholder="Title" 
            value={title} 
            onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="summary" placeholder="Summary" 
            value={summary}
            onChange={(e)=>{setSummary(e.target.value)}}/>
            <input type="file"/>
            <ReactQuill 
            value={content} 
            onChange={setContent}
            modules={modules} formats={formats}/>
            <button style={{marginTop:'5px'}}>Create Post</button>
        </form>
    )
}