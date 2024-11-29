import React , {useEffect , useState} from 'react'
import { useNavigate , Link , useParams } from 'react-router-dom'
import appwriteServices from '../appwrite/config'
import { Input , Button , Container  } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  const [post,setPost] = useState(null)
  const [image , setImage] = useState('')
  let {slug} = useParams()
  const navigate = useNavigate() 
  const userData = useSelector((state)=> state.auth.userData)
  const isAuthor = post && userData ? (post.$id === userData.$id) : false ;
  function deletePost(){
    appwriteServices.deletePost(post.$id).then((status)=>{ 
      if(status){
        appwriteServices.deleteFile(post.featuredImage)
        navigate('/')
      }
     })
  }

  useEffect(()=>{
    if(slug){
      appwriteServices.getPost(slug).then((post)=>{      
        if(post){                    
          setPost(post)
          setImage(appwriteServices.getFilePreview(post.featuresImage))
        }else{
          navigate('/')
        }
      })
    }
  } , [slug , navigate])

  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={image} alt={post.title} className='rounded-xl' />
          { isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={deletePost}
              >Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post