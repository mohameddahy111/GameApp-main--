import axios from 'axios';
import React ,{useEffect , useState} from 'react';
import { useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import Loading from '../Loading/Loading';


export default function GameDetails() {
    let params = useParams();
    const [loading, setLoading] = useState(true);
    const [gameDetails, setGameDetails] = useState([])
    let url = 'https://free-to-play-games-database.p.rapidapi.com/api/game';
    async function GameDetails() {
        let { data } = await axios.get(url, {
            params: { id: params.id },
            headers: {
                'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        })
        console.log(data);
        setLoading(false);
        setGameDetails(data);
    }
    useEffect(() => {

        GameDetails();
    }, [])


    return (


        <>
            {/* {loading && <Loading />}
            {!loading && */}

                <div className="conatiner">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={gameDetails.thumbnail} className='w-100 rounded my-3' alt="" />
                            <div className='text-muted lead p-2 rounded homeItem cursolPointer'>Free</div>
                            <a href={gameDetails.freetogame_profile_url} target='_blank' className='text-white'>
                                <div className='secondColor lead p-2 rounded'><strong>Play Now </strong><i className="fas fa-sign-out-alt"></i></div>
                            </a>
                        </div>
                        <div className="col-md-9 text-center">
                            <h1>{gameDetails.title}</h1>
                            <h5>About {gameDetails.title}</h5>
                            <p className='fs-5'>{gameDetails.description}</p>
                            <h4>{gameDetails.title}  Screenshots</h4>
                            <Carousel controls={false} interval={2500} indicators={false}>
                                {gameDetails?.screenshots?.map((item, index) => <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={item.image}
                                        alt=""
                                    />
                                </Carousel.Item>)}
                            </Carousel>

                            <h2 className='py-2'>Additional Information</h2>
                            <hr className="mt-2 mb-3"></hr>
                            <div className="row g-2">
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Title</span>
                                    <p>{gameDetails.title}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Developer</span>
                                    <p>{gameDetails.developer}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Publisher</span>
                                    <p>{gameDetails.publisher}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Release Date</span>
                                    <p>{gameDetails.release_date}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Genre</span>
                                    <p>{gameDetails.genre}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Platform</span>
                                    <p><i className="fas fa-window-maximize text-muted"></i> {gameDetails.platform}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            {/* } */}


        </>
    )
}