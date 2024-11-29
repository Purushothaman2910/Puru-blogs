import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container , PostForm } from '../components'
import appwriteServices from '../appwrite/config'

function EditPost() {
  let [post , setPost] = useState("")
  let {slug}  = useParams() ;
  let navigate = useNavigate() ;
  useEffect(()=>{
    if(slug){
      appwriteServices.getPost().then((post)=>{
        if(post){
          setPost(post)
        }else{
          navigate("/")
        }
      })
    }
  } , [slug , navigate])
  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost