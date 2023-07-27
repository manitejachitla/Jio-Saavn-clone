import React, {useContext, useEffect, useState} from 'react';
import './styles.less';
import {getAlbumImg, getArtistName, getModifiedName} from "./logic";
import Song from "../imports/Song";
import {useNavigate} from "react-router-dom";
import AppContext from "../../config/Context";
import scrollRight from '../../images/scrollRight.svg'
import scrollLeft from '../../images/scrollLeft.svg'
function MainCont(props)  {
    const {playSong} =useContext(AppContext)
    const navigate=useNavigate()
    const topMusic=React.createRef()
    const recommended=React.createRef()
    const [scrollX,setScrollX]=useState({top:0,reco:0})
    let {currentSong,albums,trending}=props
    const navigateToAlbum=(albumId)=>{
        navigate('/album/'+albumId)
    }

    const handleScroll=(key,isLeft)=>{
        let scrollBy,x=window.innerWidth*(key==='top'? 0.7:0.4),element=key==='top'?topMusic:recommended;
        if (isLeft){
            scrollBy=scrollX[key]-x
        } else {
            scrollBy=scrollX[key]+x;
        }
        if (element && element.current){
            element.current.scroll({
                top: 0,
                left: scrollBy,
                behavior: "smooth",
            });
        }

        if (scrollBy<0){
            scrollBy=0
        }
        if (scrollBy>window.innerWidth){
            scrollBy=window.innerWidth
        }
        scrollX[key]=scrollBy
        setScrollX(scrollX)


    }
    let {songs}=trending
        return (
            <>
                <div className="ma_main_top_music_cont">
                    <div className="heading_cont">
                        <p>Top Music</p>
                        <div className="heading_img_cont">
                            <img src={scrollLeft} alt="" onClick={()=>handleScroll('top',true)}/>
                            <img src={scrollRight} alt="" onClick={()=>handleScroll('top')}/>
                        </div>
                    </div>
                    <div className="ma_album_cont no_scroll_bar_cont" ref={topMusic}>
                        {
                            albums.map(each_album=>(
                                <div className={"ma_each_album_cont album_on_hover_img"} key={each_album.id} onClick={()=>{
                                    navigateToAlbum(each_album.id)
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
                        <div className="heading_cont" onMouseUp={(e)=>console.log(e.pageX)}>
                            <p>Recommended Albums</p>
                            <div className="heading_img_cont">
                                <img src={scrollLeft} alt="" onClick={()=>handleScroll('reco',true)}/>
                                <img src={scrollRight} alt="" onClick={()=>handleScroll('reco')}/>
                            </div>
                        </div>
                        <div className="recom_albums_cont no_scroll_bar_cont" ref={recommended}>
                            {
                                trending && trending.albums && Array.isArray(trending.albums)?(
                                    trending.albums.map(each_album=>(
                                        <div className={'each_album album_on_hover_img'} onClick={()=> navigateToAlbum(each_album.id)}>
                                            <img src={getAlbumImg(each_album.image,true)} alt=""/>
                                            <p className={'album_name'}>{getModifiedName(each_album.name)}</p>
                                        </div>
                                    ))
                                ):""
                            }
                        </div>
                    </div>
                </div>
            </>
        );
}

export default MainCont;