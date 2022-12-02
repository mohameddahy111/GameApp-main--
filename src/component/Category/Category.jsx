import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
// PlatFormBrowser


export default function Cat() {
    const [catData,setCatData]=useState([]);
    const [visible,setVisible]=useState(20);
    const [param,setParams]=useState(null);
    const  [loading,setLoading]=useState(true);
    
    let params=useParams();
  
    const showMoreItem =()=>{
      setVisible((prevValue) => prevValue + 20);
    }
     let url='https://free-to-play-games-database.p.rapidapi.com/api/games';
  async function getData(){
    let {data}= await axios.get(url,{
    params: {category:params.category},
    headers: {
          'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }})
        console.log(data);
        setCatData(data);
        setLoading(false);
  }
  useEffect(()=>{
     setParams(params);
    getData();
  },[params])
  
  
    return (
      <>
      {loading && <Loading/>}
      {!loading && <>
        <section>
        <div className="container mt-5">
          <div className="row g-4">
            {catData.slice(0,visible).map((catitem,index)=> <div className="col-md-3" key={index}>
              <Link to={'/gameDetails/'+catitem.id}>
              <div className="catitem  pb-3 shadow mb-5 cursolPointer scaleItem">
             <img src={catitem.thumbnail} className='w-100 mb-3' alt="" />
               <div className='position-relative px-2'>
               <h4 className='px-2'>{catitem.title.slice(0,15)}</h4>
                <span className="badge text-bg-primary px-3 mx-3 py-2 position-absolute end-0 bottom-0">Free</span>
               </div>
               <div className='px-2'>
               <p className='px-2'>{catitem.short_description.slice(0,25)+'....'}</p>
               </div>
               <div className='d-flex px-2 justify-content-between'>
               <div ><i className="fas fa-plus-square px-2 text-muted"></i></div>
               <div><span className='LightColor rounded px-1 text-dark'>{catitem.genre}</span> {catitem.platform=="PC (Windows)"?<i className="fa-brands fa-windows text-muted"></i>:<i className="text-muted fa-solid fa-window-maximize"></i>}</div>
               </div>
              </div>
              </Link>
            </div> )}
           
          </div>
          <div className='text-center'>
          <button className='btn btn-outline-secondary mb-4' onClick={showMoreItem}>More Games <i className="fa-solid fa-chevron-right text-muted"></i></button>
          </div>
        </div>
      </section>
      </>}
     
      </>
    )
  }