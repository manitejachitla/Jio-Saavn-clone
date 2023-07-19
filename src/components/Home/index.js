import React, {useEffect, useState} from 'react';
import useSound from 'use-sound';
import './styles.css'
import soma from './soma.mp3'
import SideBar from "../SIdeBar/SideBar";
function Home () {
    const [song,setSong]=useState(true)
    const [url,setUrl]=useState('https://aac.saavncdn.com/298/373a7e986b4a4e64f5273f59a6c9f5cf_320.mp4')
    const [play,{stop,pause,duration,sound}] = useSound(url);
    useEffect(()=>{
        stop()
        play()
    },[url])
    return (
        <div className={'ma_main_cont'}>
            <div className="ma_background_cont"/>
            <div className="ma_content_cont">
                <SideBar/>
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