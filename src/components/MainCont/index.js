import React from 'react';
import './styles.less';
import playImg from '../../images/play.svg'
import like from '../../images/like.svg'
import {formatDuration, getAlbumImg, getArtistName, getModifiedName} from "./logic";
import Song from "../imports/Song";
import {useNavigate} from "react-router-dom";
function MainCont(props)  {
    const navigate=useNavigate()
    let {currentSong,albums,trending,playSong}=props
    let {songs}=trending
        return (
            <div className={'ma_main_content_cont'}>
                <div className="ma_main_search_cont">
                    <h2>Serach comes here</h2>
                </div>
                <div className="ma_main_top_music_cont no_scroll_bar_cont">
                    <div className="heading_cont">
                        <p>Top Music</p>
                    </div>
                    <div className="ma_album_cont">
                        {
                            albums.map(each_album=>(
                                <div className={"ma_each_album_cont"} key={each_album.id} onClick={()=>{
                                    navigate('/album/'+each_album.id)
                                }}>
                                    <img src={getAlbumImg(each_album.image,true)} alt=""/>
                                    <p className={'album_name'}>{getModifiedName(each_album.name)}</p>
                                    <p className={'artist_name'}>{getArtistName(each_album.artists)}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="ma_main_music_cont">
                    <div className="ma_main_popular_cont">
                        <div className="heading_cont">
                            <p>Popular</p>
                        </div>
                        <div className="songs_cont">
                            {
                                songs && songs.map(song=>(
                                    <Song song={song} currentSong={currentSong} playSong={playSong} isHome={trending}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className="ma_main_recommend_cont">
                        <div className="heading_cont">
                            <p>Recommended Albums</p>
                        </div>
                        <div className="recom_albums_cont no_scroll_bar_cont">
                            {
                                trending && trending.albums && Array.isArray(trending.albums)?(
                                    trending.albums.map(each_album=>(
                                        <div className={'each_album'}>
                                            <img src={getAlbumImg(each_album.image,true)} alt=""/>
                                            <p className={'album_name'}>{getModifiedName(each_album.name)}</p>
                                        </div>
                                    ))
                                ):""
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default MainCont;