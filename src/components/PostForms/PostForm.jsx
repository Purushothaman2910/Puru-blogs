import React , {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Inputs from '../Inputs'
import RTE from '../RTE'
import Select from '../Select'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm({post}) {
  const {register , handleSubmit ,watch ,setValue ,control , getValues} = useForm({
     title : post?.title || "" ,
     slug : post?.slug || "" ,
     content : post?.content || "" ,
     status : post?.status || "active"
  });

  const navigate = useNavigate() ;
  let userData = useSelector((state)=> state.auth.userData)
  const submit = async(data) => {
    if(post){
      let file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null ;
      if(file){
        appwriteService.deleteFile(post.featuredImage)
      }
      const dbPost = await appwriteService.updatePost(post.$id , {
        ...data ,
        featuredImage : file ? file.$id : undefined 
      })
      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }
    }else{
      const file = await appwriteService.uploadFile(data.image[0]) ;
      if(file){
        const fileId = file.$id ;
        data.featuresImage = fileId ;
        console.log("data :",data);         
        const dbPost = await appwriteService.createPost({...data , userId : userData.$id })
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      }

    }
  }
  const slugTransform = useCallback((value) => {
    if(value && (typeof(value) === "string")){
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g,"-").replace(/\s/g,"-")
    }
  },[])
  useEffect(()=>{
    watch((value , {name})=>{
      if(name === "title"){
        setValue("slug" , slugTransform(value.title) , {shouldValidate : true })
      }
    })
  },[watch,setValue,slugTransform])
  return (
    <form 
    onSubmit={handleSubmit(submit)} 
    className='flex flex-wrap'
    >
      <div className='w-2/3 px-2'>
        <Inputs
        label = "Title" 
        placeholder = "title"
        className = 'mb-4'
        {...register("title",{required:true})}
         />
        <Inputs
          label="Slug :"
          placeholder="slug"
          className='mb-4'
          {...register("slug", { required: true })}
          onInput = {(e)=>{
            setValue("slug" , slugTransform(e.target.value) , {shouldValidate : true})
          }}
        />
        <RTE label={"Content"} name={"content"} control={control} defaultValues={getValues('content')} />
      </div>
      <div className='w-1/3 px-2'>
          <Inputs 
          label = "Featured Image"
          type = "file"
          className = 'mb-4'
          accept="image/png image/jpeg image/jpg"
          {...register("image",{required:(!post)})}
           />
           {
            post && (
              <div className='w-full mb-4'>
                <img 
                src={appwriteService.getFilePreview(post.featuredImage)} 
                alt={post.title} 
                className='rounded-lg'
                />
              <Select 
              options = {[{name : "Active" , value : "active" },{name : "Inactive" , value : "inactive" }]} 
              className = "mb-4"
              {...register("status",{required:true})}              
              />
              </div>
            )
           }
        <Button
          type='submit'
          bgColor={post ? 'bg-green-500' : "bg-red-500"}
          className='w-full'
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm