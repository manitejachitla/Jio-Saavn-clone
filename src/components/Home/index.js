import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import './styles.less'
import SideBar from "../SIdeBar/SideBar";
import MainCont from "../MainCont";
import Axios from "../../config/Axios";
import Player from "../Player/Player";
import Album from "../imports/Album";
import AppContext from "../../config/Context";
import searchImg from "../../images/search.svg";
import {getAlbumImg} from "../MainCont/logic";
import settingsImg from "../../images/settings.svg";
import notificationsImg from "../../images/notifications.svg";
import ItemList from "../imports/ItemList";

function Home () {
    const navigate=useNavigate()
    const location=useLocation()
    const [data,setData]=useState(null)
    const [queue,setQueue]=useState([])
    const [song,setSong]=useState(null)
    const [isPlaying,setisPlaying]=useState(false)
    const [loading,setloading]=useState(true)
    const [searchData,setSearchData]=useState(null)
    const [searchVal,setSearchVal]=useState('')
    const [showSearch,setshowSearch]=useState(false)
    // const [url,setUrl]=useState('https://aac.saavncdn.com/298/373a7e986b4a4e64f5273f59a6c9f5cf_320.mp4')
    const [url,setUrl]=useState(null)
    const handleSearchChange=(e)=>{
        let val=e.target.value;
        setSearchVal(val)
        setshowSearch(true)
    }
    const handleSearchItemClick=async (item)=>{
        let {type,id}=item
        setshowSearch(false)
        switch (type) {
            case 'album':{
                navigate('/album/'+id)
                break
            }case 'playlist':{
                navigate('/playlist/'+id)
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
    useEffect(()=>{
        const getData = setTimeout(async () => {
            if (searchVal && searchVal!==''){
                let data=await Axios.get('search/all?query='+searchVal)
                setSearchData(data)

            }
        }, 1000)
        return () => clearTimeout(getData)
    },[searchVal])
    let getData=async ()=> {
        let data = await Axios.get('modules?language=telugu')
        setloading(false)
        setData(data)
    }
    useEffect(()=>{
        console.log(location)
        getData()
    },[])
    useEffect(()=>{
        if (location.pathname!=='/'){
            setloading(true)

        }
    },[location])
    const addSongToStorage=(key,selectedSong)=>{
        let music=window.localStorage.getItem('music')
        if (music){
            music=JSON.parse(music)
        }
        if (!music){
            music={}
        }
        if (!music[key]){
            music[key]=[]
        }
        if (!music[key].find(item=>item.id===selectedSong.id)){
            music[key].push(selectedSong)
            window.localStorage.setItem("music",JSON.stringify(music))
        }
        // console.log(likedSongs)
    }
    const playSong=async(song)=>{
        let selected_song = []
        selected_song=await Axios.get('/songs?id=' + song.id)
        if (!selected_song) return;
        selected_song=selected_song[0]
        let selected_song_link=selected_song?.downloadUrl
        let songlink=selected_song_link.slice(-1)[0].link
        addSongToStorage('recent',song)
        setUrl(songlink)
        setSong(selected_song)
        console.log(songlink)
    }
    return (
        <AppContext.Provider value={{currentSong: song,data,url,playSong,isPlaying,setisPlaying,queue,setQueue,loading,setloading,getData,addSongToStorage}}>
            <div className={'ma_main_cont'}>
                <div className="ma_background_cont"/>
                <div className="ma_content_cont">
                    <SideBar/>
                    <div className={'ma_main_content_cont'}>
                        <div className="ma_main_search_cont">
                            <div className="search_input">
                                <img src={searchImg} alt=""/>
                                <input type="text" placeholder={'Search for song,artists etc...'} onChange={handleSearchChange} value={searchVal}/>
                                {
                                    showSearch && searchVal && searchVal!==''?(
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
                        <div className="ma_main_route_cont no_scroll_bar_cont">
                            {
                                loading?(
                                    <div className={'ma_main_loading_cont'}>

                                        <div className="loadingio-spinner-rolling-cwu0byipolm"><div className="ldio-yz9vtfty9dn">
                                            <div></div>
                                        </div></div>
                                    </div>
                                ):(
                                    <Routes>
                                        <Route path={'/'} element={<MainCont currentSong={song} albums={data?.albums || []} trending={data?.trending || {}} playSong={playSong}/>}/>
                                        <Route path="/album/:id" element={<Album type={'album'} key={'album'}/>}/>
                                        <Route path="/playlist/:id" element={<Album type={'playlist'} key={'playlist'}/>}/>
                                        <Route path="/playlists" element={<ItemList type={'playlist'} key={'playlist'}/>}/>
                                        <Route path="/albums" element={<ItemList  type={'album'} key={'album'} />}/>
                                        <Route path="/recent" element={<Album type={'recent'} key={'recent'} />}/>
                                        <Route path="/liked" element={<Album type={'like'} key={'like'} />}/>
                                    </Routes>
                                )
                            }
                        </div>
                    </div>
                    {
                        song?(
                            <Player />
                        ):""
                    }
                </div>
                {/*<h2 onClick={()=>{*/}
                {/*    console.log("clicked")*/}
                {/*}}>{duration}</h2>*/}
                {/*<button*/}
                {/*    onClick={()=>{*/}
                {/*        console.log("clicked")*/}
                {/*        play()*/}
                {/*    }}>Play</button>*/}
                {/*<button*/}
                {/*    onClick={()=>{*/}
                {/*        console.log("clicked")*/}
                {/*        stop()*/}
                {/*    }}>Stop</button>*/}
                {/*<button*/}
                {/*    onClick={()=>{*/}
                {/*        setSong(!song)*/}
                {/*        setUrl(song?'https://aac.saavncdn.com/298/373a7e986b4a4e64f5273f59a6c9f5cf_320.mp4':'https://aac.saavncdn.com/872/015ba05e215f9050011647afa539f2dc_320.mp4')*/}
                {/*    }}>change track</button>*/}
            </div>
        </AppContext.Provider>
    );
}

export default Home;