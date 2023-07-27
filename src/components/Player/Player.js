import React, {useContext, useEffect, useRef, useState} from "react";
import './styles.less'
import like from '../../images/volume.png'
import plalist from '../../images/playlist.svg'
import repeat from '../../images/Repeat.svg'
import backImg from '../../images/backward.svg'
import forwardImg from '../../images/forward.svg'
import pauseImg from '../../images/player_pause.svg'
import playImg from '../../images/player_play.svg'
import {formatDuration, getAlbumImg, getModifiedName} from "../MainCont/logic";
import AppContext from "../../config/Context";
function Player(){
    let {currentSong,url,queue,isPlaying,setisPlaying,playSong}=useContext(AppContext)
    const audioRef=useRef(null)
    const progressRef=useRef(null)
    const [progress,setProgress]=useState(0)
    const [currDuration,setcurrDuration]=useState(0)
    const [volume,setVolume]=useState(100)
    const isSongChanged = useRef(false);
    const playCurrentSong=()=>{
        setisPlaying(true)
        if (audioRef.current) {
            audioRef.current.play()
        }
    }
    const pauseCurrentSong=()=>{
        setisPlaying(false)
        if (audioRef.current) {
            audioRef.current.pause()
        }
    }
    useEffect(()=>{
        if (currentSong && url) {
            if (audioRef.current) {
                isSongChanged.current=true
                audioRef.current.play()
                setisPlaying(true)
                setcurrDuration(0)
                setProgress(0)
            }
        }
    },[currentSong])
    useEffect(()=>{
        console.log(currentSong)
    },[])
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log("this is 1000 seconds",audioRef.current,isPlaying)
            if (audioRef.current){
                setcurrDuration(audioRef.current.currentTime)
                setProgress((parseInt(audioRef.current.currentTime)/parseInt(currentSong.duration))*100)
                if (audioRef.current.ended){
                    handleSkipOptions('next')
                }
            }
        }, 1000);
        // console.log("here player",interval)
        return () => clearInterval(interval);
    }, []);
    let handleSkipOptions=(action)=>{
        if (!queue || !Array.isArray(queue) || !queue.length) return;
        let currentSongIndex=queue.findIndex(item=>item.id===currentSong.id)
        let nextSongIndex=currentSongIndex;
        switch (action) {
            case 'prev':{
                nextSongIndex=nextSongIndex-1;
                break;
            }case 'next':{
                nextSongIndex=nextSongIndex+1;
                break;
            }
        }
        if (nextSongIndex>=0 && nextSongIndex<queue.length){
            console.log({nextSongIndex})
            playSong(queue[nextSongIndex])
        }
    }
    return (
        <div className={'ma_player_main_cont'}>
            {
                currentSong?(
                    <div className="song_details_cont">
                        <div className="song_name_cont">
                            <img src={getAlbumImg(currentSong.image)} className={'song_img'}/>
                            <div className="each_song_name">
                                <p>{getModifiedName(currentSong.name)}</p>
                                {currentSong.album && currentSong.album.name ?(
                                    <p>{getModifiedName(currentSong.album.name)}</p>
                                ):""}
                            </div>
                        </div>
                        <div className="song_actions_cont">
                            <img src={backImg} alt="" onClick={()=>handleSkipOptions('prev')}/>
                            <img src={isPlaying?pauseImg:playImg} alt="" className={'play_img'} onClick={isPlaying?pauseCurrentSong:playCurrentSong}/>
                            <img src={forwardImg} alt="" onClick={()=>handleSkipOptions('next')}/>
                            <p className={'curr duration'}>{formatDuration(currDuration)}</p>
                            <div className="progress_bar_cont" ref={progressRef} onClick={(e)=> {
                                let fullwidth=progressRef.current.offsetWidth
                                let coords=progressRef.current.getBoundingClientRect()
                                const clamp = (num) => Math.min(Math.max(num, 0), currentSong.duration);
                                let value=(e.clientX-coords.left)/fullwidth;
                                // return;
                                let dur=clamp(currentSong.duration * (value))

                                console.log(value,currentSong.duration,dur,fullwidth)
                                if (audioRef.current) {
                                    audioRef.current.currentTime=dur
                                    setcurrDuration(dur)
                                    setProgress(value*100)
                                }
                            }}>
                                <div className="selected_cont" style={{width:`${progress}%`}}>
                                </div>
                                <div className="progress_icon_cont">
                                    <div></div>
                                </div>
                            </div>
                            <p className={'tot duration'}>{formatDuration(currentSong.duration)}</p>

                        </div>
                        <div className="player_action_cont">
                            <div className={'volume_cont'}>
                                <div className="volume_hidden_cont">
                                    <input type="range" id="points" name="points" min="0" max="100" value={volume} onChange={(e)=>{
                                        let set_vol=e.target.value
                                        if (audioRef.current){
                                            audioRef.current.volume=set_vol/100
                                            setVolume(set_vol)
                                        }
                                    }}/>
                                </div>
                                <img src={like} alt="volume" className={'volume'}/>
                            </div>
                            <img src={plalist} alt=""/>
                            <img src={repeat} title={`Repeat ${audioRef.current && audioRef.current.loop?"ON":"OFF"}`} alt="" onClick={()=>{
                                if (audioRef.current) {
                                    audioRef.current.loop =!audioRef.current.loop
                                }
                            }}/>
                        </div>
                    </div>
                ):""
            }
        <audio src={url} ref={audioRef}/>
            {/*<button onClick={()=>{*/}
            {/*    if (audioRef.current){*/}
            {/*        console.log(audioRef)*/}
            {/*        audioRef.current.play()*/}
            {/*        console.log(audioRef.current)*/}
            {/*    }*/}
            {/*}}>play</button>*/}
            {/*<button onClick={()=>{*/}
            {/*    if (audioRef.current){*/}
            {/*        audioRef.current.pause()*/}
            {/*        console.log(audioRef.current)*/}
            {/*    }*/}
            {/*}}>stop</button>*/}
        </div>
    )
}
export default Player;