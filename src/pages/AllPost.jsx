import React , {useState , useEffect} from 'react'
import { Container , PostCard } from '../components'
import appwriteServices from '../appwrite/config'
import { useNavigate } from 'react-router-dom'

function AllPost() {
  let [post , setPost] = useState([])
  let navigate = useNavigate()
  useEffect(()=>{
    appwriteServices.getPosts([]).then((posts) => {
      if(posts){
        setPost(posts.documents)
      }else{
        navigate("/")
      }
    } )
  } , [])
  return (post.length !== 0) ? (<div className='w-full py-8'>
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div className="p-2 w-1/4" key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  </div>) : null
}

export default AllPost