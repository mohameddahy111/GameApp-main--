import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading'


export default function All() {
    const [AllGames, setAllGames] = useState([]);
    const [showgames, setShowgames] = useState(20);
    const [loading, setLoading] = useState(true);
    const showMoreItems = () => { setShowgames((prevValue) => prevValue + 20) }
    const navigate = useNavigate();
    const viewDetails = id => {
        navigate(`/gameDetails/${id}`)
    }

    let url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;

    async function getData() {

        let { data } = await axios.get(url, {
            headers: {
                'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'


            }

        })
        setAllGames(data);
        setLoading(false);

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {/* {loading && <Loading />}
            {!loading && */}

            <div className="container my-2 pb-2">
                <div className="row">
                    {AllGames.slice(0, 20).map((AllGames, index) => <div className="col-md-3 my-2 pb-2 " key={index}>

                        <Link to={`/gameDetails/` + AllGames.id} className=" text-decoration-none text-white">
                            <div className="AllGames">
                                <img src={AllGames.thumbnail} className="w-100 m-auto mb-3" alt="" />
                                <div className="position-relative">
                                    <h5 className='px-3'>{AllGames.title}</h5>
                                    <span className='badge text-primary px-2 py-2 position-absolute end-0 bottom-0'>Free</span>
                                </div>
                                <div className="desc px-2">
                                <p className='px-2 text-white'>{AllGames.short_description.split(' ').splice(0,7).join(' ')+'....'}</p>
                                </div>
                                <div className="icon d-flex justify-content-evenly">
                                    <i className="fas fa-plus-square px-2 text-muted"></i>
                                    <span className='Light rounded px-2 text-dark  text-white'>{AllGames.genre}</span>
                                    {AllGames.platform === "PC (Windows)" ? <i className="fa-brands fa-windows text-muted"></i> : <i className="text-muted fa-solid fa-window-maximize"></i>}
                                </div>

                            </div>
                        </Link>
                    </div>
                    )}

                </div>
                <div className='text-center'>
                    <button className='btn btn-outline-secondary mb-4' onClick={showMoreItems}>More Games <i class="fa-solid fa-chevron-down"></i></button>
                </div>
            </div>

            {/* } */}


        </>)

}