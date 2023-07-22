import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import './styles.less'
import SideBar from "../SIdeBar/SideBar";
import MainCont from "../MainCont";
import Axios from "../../config/Axios";
import Player from "../Player/Player";
import Album from "../imports/Album";

function Home () {
    const [data,setData]=useState(null)
    const [play,setPlay]=useState(false)
    const [song,setSong]=useState(null)
    // const [url,setUrl]=useState('https://aac.saavncdn.com/298/373a7e986b4a4e64f5273f59a6c9f5cf_320.mp4')
    const [url,setUrl]=useState(null)

    useEffect(()=>{
        console.log("hereee",url)
        if (url){
            // setPlay(true)
        } else {
            setPlay(false)
        }
    },[url])
    useEffect(()=>{
        let getData=async ()=> {
            let data = await Axios.get('modules?language=telugu')
            setData(data)
            }
        getData()
    },[])

    const playSong=async(song)=>{
        setPlay(false)
        let selected_song = []
        selected_song=await Axios.get('/songs?id=' + song.id)
        setSong(selected_song)
        let selected_song_link=selected_song?.downloadUrl
        let songlink=selected_song_link.slice(-1)[0].link
        setUrl(songlink)
        setPlay(true)
        console.log(songlink)
    }
    return (
        <div className={'ma_main_cont'}>
            <div className="ma_background_cont"/>
            <div className="ma_content_cont">
                <SideBar/>
                <Routes>
                    <Route path={'/'} element={<MainCont currentSong={song} albums={data?.albums || []} trending={data?.trending || {}} playSong={playSong}/>}/>
                    <Route path="/album/:id" element={<Album/>}/>
                </Routes>
                {
                    song?(
                        <Player song={song} url={url} playSong={play}/>
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
    );
}

export default Home;