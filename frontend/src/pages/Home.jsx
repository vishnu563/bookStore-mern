import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import {BsinfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox,MdOutlineDelete } from 'react-icons/md';



const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    axios
    .get('http://localhost:5555/books')
    .then((res)=>{
      setBooks(res.data.data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  },[]);
  return (
    <div>Home</div>
  )
}

export default Home