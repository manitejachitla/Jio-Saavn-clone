import React, {useContext, useEffect, useState} from 'react';
import './styles.less';
import searchImg from '../../images/search.svg'
import settingsImg from '../../images/settings.svg'
import notificationsImg from '../../images/notifications.svg'
import {getAlbumImg, getArtistName, getModifiedName, getResultDetails} from "./logic";
import Song from "../imports/Song";
import {useNavigate} from "react-router-dom";
import Axios from "../../config/Axios";
import AppContext from "../../config/Context";
function MainCont(props)  {
    const {playSong} =useContext(AppContext)
    const navigate=useNavigate()
    const callSearch=React.createRef()
    const [searchData,setSearchData]=useState(null)
    const [searchVal,setSearchVal]=useState('')
    let {currentSong,albums,trending}=props
    const navigateToAlbum=(albumId)=>{
        navigate('/album/'+albumId)
    }
    useEffect(()=>{
        const getData = setTimeout(async () => {
            if (searchVal && searchVal!==''){
                let data=await Axios.get('search/all?query='+searchVal)
                setSearchData(data)

            }
        }, 1000)
        return () => clearTimeout(getData)
    },[searchVal])
    const handleSearchChange=(e)=>{
        let val=e.target.value;
        setSearchVal(val)
        console.log({val})
    }
    const handleSearchItemClick=async (item)=>{
        let {type,id}=item
        switch (type) {
            case 'album':{
                navigate('/album/'+id)
                break
            }case 'song':{
                playSong(item)
                break
            }
            default: break;
        }
        console.log(item)
        console.log(item.type)
    }
    let {songs}=trending
        return (
            <div className={'ma_main_content_cont'}>
                <div className="ma_main_search_cont">
                    <div className="search_input">
                        <img src={searchImg} alt=""/>
                        <input type="text" placeholder={'Search for song,artists etc...'} onChange={handleSearchChange} value={searchVal}/>
                        {
                            searchVal && searchVal!==''?(
                                <div className="search_results_cont no_scroll_bar_cont">
                                    {searchData ?(
                                        Object.keys(searchData).map(type=>(
                                            <>
                                                {
                                                    searchData[type].results.length?(
                                                        <div className="each_search_result">
                                                            <p className={'each_search_result_heading'}>
                                                                {type==='topQuery'?'Top Result':type.toUpperCase()[0]+type.slice(1,type.length)}
                                                            </p>
                                                            {
                                                                searchData[type].results.map(result=>(
                                                                    <div className="each_search_result_item" onClick={()=>handleSearchItemClick(result)}>
                                                                        <img src={getAlbumImg(result.image)} alt=""/>
                                                                        <div className="name_cont">
                                                                            <p className={'result_name'}>{result.title}</p>
                                                                            {/*<p className={'result_album'}>*/}
                                                                            {/*    {result.album ?result.album :''}*/}
                                                                            {/*    {result.artist ?result.artist.split(',')[0] :''}*/}
                                                                            {/*    {result.type==='artist' && result.description ?result.description :''}*/}
                                                                            {/*</p> */}
                                                                            <p className={'result_album'}>
                                                                                {result.description ?result.description :''}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    ):""
                                                }
                                            </>
                                        ))
                                    ):""}
                                </div>
                            ):""
                        }
                    </div>
                    <div className="search_action">
                        <button>Upgrade To Premium</button>
                        <img src={settingsImg} alt=""/>
                        <img src={notificationsImg} alt=""/>
                    </div>
                </div>
                <div className="ma_main_top_music_cont no_scroll_bar_cont">
                    <div className="heading_cont">
                        <p>Top Music</p>
                    </div>
                    <div className="ma_album_cont">
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
                        <div className="heading_cont">
                            <p>Recommended Albums</p>
                        </div>
                        <div className="recom_albums_cont no_scroll_bar_cont">
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
            </div>
        );
}

export default MainCont;