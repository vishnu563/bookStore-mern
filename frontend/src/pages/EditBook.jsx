import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';


const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const {id} = useParams();


  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
    .then((res)=>{
      setAuthor(res.data.book.author)
      setTitle(res.data.book.title)
      setPublishYear(res.data.book.publishYear)
      setLoading(false)
      
    }).catch((err)=>{
      setLoading(false);
      console.log(err);
      alert('Error Occured Check Console')
    })
  },[])
  const handleEditBook = ()=>{
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((err)=>{
      setLoading(false);
      alert('Error Occured Check Console')
      console.log(err);
    })
  }

  return (
    <div>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading?<Spinner/>:""}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-4xl mr-4 text-gray-500'>Title</label>
          <input
           type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-4xl mr-4 text-gray-500'>Author</label>
          <input
           type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-4xl mr-4 text-gray-500'>Publish Year</label>
          <input
           type="number" value={publishYear} onChange={(e)=>setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBooks