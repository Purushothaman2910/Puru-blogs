import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container , PostForm } from '../components'
import appwriteServices from '../appwrite/config'

function EditPost() {
  let [post , setPost] = useState(null)
  let {slug}  = useParams() ;
  let navigate = useNavigate() ;
  useEffect(()=>{
    console.log("edit post running");    
    if(slug){
      appwriteServices.getPost(slug).then((post)=>{
        if(post){        
          setPost(post)
        }else{
          navigate("/")
        }
      })
    }
  } , [slug , navigate])
  return (post !== null ) ? (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null ;
}

export default EditPost