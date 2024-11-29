import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

function RTE({name , control , label , defaultValues = ""}) {
  return (
    <div className='w-full'>
        {(label) && (<label className='inline-block mb-1 pl-1' >{label}</label>)}
        <Controller 
        name={name || 'Content'}
        control={control}
        render={({field : {onChange}})=>(
          <Editor
          apiKey='tunf9ineahc94w8qlmf29fm6erzszp6ao73y0jbhfyh70jv7'
          init={{
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          }}
          initialValue="Welcome to TinyMCE!"
          onEditorChange={onChange}
        />
        )}
        />  
    </div>
  )
}

export default RTE