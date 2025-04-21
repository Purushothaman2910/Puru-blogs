import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import appwriteServices from '../appwrite/config'
import { Input, Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  const [post, setPost] = useState(null)
  const [image, setImage] = useState('')
  let { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const [isAuthor, setIsAuthor] = useState(false)
  // const isAuthor = post && userData ? (post.$id === userData.$id) : false ;
  function deletePost() {
    appwriteServices.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteServices.deleteFile(post.featuresImage)
        navigate('/')
      }
    })
  }

  async function fetchData(slug) {
    let response = await appwriteServices.getPost(slug);
    if (response) {
      setPost(response)
      setIsAuthor(response.userId === userData.$id)
      let imageUrl = await appwriteServices.getFilePreview(response.featuresImage)
      setImage(imageUrl)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchData(slug)
    }
  }, [slug, navigate])

  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative p-2 gap-2 items-center'>
          <div className="mb-6 flex-grow min-h-[50vh] flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <div className="browser-css">
                {parse(post.content)}
              </div>
            </div>
            {isAuthor && (
              <div className="absolute-right-6 top-6 flex">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500"
                  onClick={deletePost}
                >Delete</Button>
              </div>
            )}
          </div>
          <img src={image} alt={post.title} className='rounded-xl h-[50vh] flex-grow' />
        </div>
      </Container>
    </div>
  ) : null
}

export default Post