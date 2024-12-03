import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwiteService from '../appwrite/config.js'

function PostCard({$id ,title ,featuresImage}) {
  let [image,setImage] = useState('') ;
  async function fetImage(id) {
    let imageUrl = await appwiteService.getFilePreview(id)
    setImage(imageUrl)
  }
  useEffect(()=>{
    fetImage(featuresImage)
  },[])
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img className='rounded-xl' src = {image} alt = {title} />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard