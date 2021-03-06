import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment/locale/pt';


import { Container } from './styles';

import UserHeader from '../UserHeader';
import LazyImage from '../LazyImage';
import CommentList from '../CommentList';
import CommentBoxInput from '../CommentBoxInput';

export default function Post({ index, postData }) {

    const [favorite, setFavorite] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isShortened, setShortenedValue] = useState(false);
    const [description, setDescription] = useState(postData.description);

    const large_image = `https://picsum.photos/id/${postData.id}/600`;
    const minified_image = `https://picsum.photos/id/${postData.id}/32`;

    const user_data = {
        url: postData.url,
        name: postData.author,
        avatar: minified_image
    };

    useEffect(() => {
        if (postData.description.length > 120) {
            let result = postData.description.substr(0, 120);
            result = result.substr(0, Math.min(result.length, result.lastIndexOf(" ")))
            
            setDescription(result);
            setShortenedValue(true);
        }
    }, [postData.description]);

    function readMoreButtonHandle(event) { 
        setDescription(postData.description);
        setShortenedValue(false);
    }

    return (
        <Container>
            <UserHeader userData={user_data} />

            <LazyImage
                loadOnInit={index === 0}
                favorite={favorite}
                setFavorite={(value) => setFavorite(value)}
                minified={minified_image}
                large={large_image}
                alt={`${postData.id}`}
            />

            <footer>
                <button className="favorite-button" onClick={() => setFavorite(!favorite)}>
                    <svg className={favorite ? "upvote" : "downvote"} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        {favorite ? (
                            <g>
                                <path d="M256,481c-3.53,0-7.046-1.23-9.873-3.706c-21.826-19.087-42.583-36.782-62.109-53.423
                                    C73.817,329.96,0,267.909,0,177.514C0,93.988,59.037,31,136,31c60.659,0,99.595,42.378,120,80.537C276.405,73.378,315.341,31,376,31
                                    c76.963,0,136,62.988,136,146.514c0,90.396-73.817,152.446-184.018,246.357c-19.526,16.641-40.283,34.336-62.109,53.423
                                    C263.046,479.77,259.53,481,256,481z"/>
                                <path d="M265.873,477.294c21.826-19.087,42.583-36.782,62.109-53.423C438.183,329.96,512,267.909,512,177.514
                                    C512,93.988,452.963,31,376,31c-60.659,0-99.595,42.378-120,80.537V481C259.53,481,263.046,479.77,265.873,477.294z"/>
                            </g>
                        ) : (
                            <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                            c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                            c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                            c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                            c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                            c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                            C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                            c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                            C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                            c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                            c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                            C482,254.358,413.255,312.939,309.193,401.614z"/>
                            )}
                    </svg>
                </button>
                
                <p>
                    <a className="author" href={postData.url}>{postData.author}</a>
                    <span>
                        <span className="post-description">
                            {description}
                        </span>
                        {isShortened && (
                            <span>
                                ...
                                <button className="read-more" onClick={readMoreButtonHandle}>mais</button>
                            </span>
                        )}
                    </span>
                </p>

                <CommentList commentList={commentList} />

                <Moment className="moment-timestamp" fromNowDuring="1314900000" format="LL">{postData.timestamp}</Moment>

            </footer>
            
            <CommentBoxInput commentList={commentList} setCommentList={setCommentList} />
        </Container>
    );
}
