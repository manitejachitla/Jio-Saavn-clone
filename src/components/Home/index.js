import React, {useEffect, useState} from 'react';
import useSound from 'use-sound';
import './styles.less'
import SideBar from "../SIdeBar/SideBar";
import MainCont from "../MainCont";
import Axios from "../../config/Axios";
import Player from "../Player/Player";
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
            let response = await Axios.get('modules?language=telugu')
            console.log({data: response.data})
            if (response.data){
                setData(response.data.data)
            }
            }
        getData()
    },[])

    const playSong=async(song)=>{
        setPlay(false)
        let response=await Axios.get('/songs?id='+song.id),selected_song=[]
        if (response && response.data && response.data.data && response.data.data[0] && response.data.data[0].downloadUrl){
            selected_song=response.data.data[0]
        }
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
                <MainCont currentSong={song} albums={data?.albums || []} trending={data?.trending || {}} playSong={playSong}/>
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