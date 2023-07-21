import React, {useEffect, useRef, useState} from "react";
import './styles.less'
import like from '../../images/like2.svg'
import plalist from '../../images/playlist.svg'
import repeat from '../../images/Repeat.svg'
import backImg from '../../images/backward.svg'
import forwardImg from '../../images/forward.svg'
import pauseImg from '../../images/player_pause.svg'
import playImg from '../../images/player_play.svg'
import {formatDuration, getAlbumImg, getModifiedName} from "../MainCont/logic";
function Player({song,url}){
    const audioRef=useRef(null)
    const [progress,setProgress]=useState(0)
    const [currDuration,setcurrDuration]=useState(0)
    const [isPlaying,setisPlaying]=useState(false)
    const playSong=()=>{
        setisPlaying(true)
        console.log(song,isPlaying)
    }
    const pauseSong=()=>{
        setisPlaying(false)
    }
    const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    useEffect(()=>{
        if (song && url){
            if (audioRef.current){
                    setisPlaying(true)
                    audioRef.current.play()
                }
        }
    },[song])
    useEffect(()=>{
        if (audioRef.current && false){
            if (isVideoPlaying(audioRef.current)){
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
        }
    },[isPlaying])
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log("this is 1000 seconds",audioRef.current,isPlaying)
            if (audioRef.current){
                setcurrDuration(audioRef.current.currentTime)
                setProgress((parseInt(audioRef.current.currentTime)/parseInt(song.duration))*100)
            }
        }, 1000);
        // console.log("here player",interval)
        return () => clearInterval(interval);
    }, []);
    return (
        <div className={'ma_player_main_cont'}>
            {
                song?(
                    <div className="song_details_cont">
                        <div className="song_name_cont">
                            <img src={getAlbumImg(song.image)} className={'song_img'}/>
                            <div className="each_song_name">
                                <p>{getModifiedName(song.name)}</p>
                                {song.album && song.album.name ?(
                                    <p>{getModifiedName(song.album.name)}</p>
                                ):""}
                            </div>
                        </div>
                        <div className="song_actions_cont">
                            <img src={backImg} alt=""/>
                            <img src={isPlaying?pauseImg:playImg} alt="" className={'play_img'} onClick={isPlaying?pauseSong:playSong}/>
                            <img src={forwardImg} alt=""/>
                            <p className={'curr duration'}>{formatDuration(currDuration)}</p>
                            <input type="range" onLoadedData={()=>{
                                if (isPlaying){
                                    // audioRef.current.play()
                                }
                            }} value={progress} id={'song_progress'}
                                   onPlaying={()=>setisPlaying(true)}
                                   onProgress={(e)=>{
                                console.log(e)
                            }} className={'progress_bar_cont'} onInput={(e)=>{
                                let dur=song.duration * (e.target.value/100)
                                console.log(e.target.value,song.duration,dur)
                                if (audioRef.current) {
                                    audioRef.current.currentTime=dur
                                    // setcurrDuration(dur)
                                    // setProgress(dur)
                                }
                            }}/>
                            {/*<div className="progress_bar_cont" onClick={(e)=>console.log(e)}>*/}
                            {/*    <div className="selected_cont" style={{width:`${progress}%`}}>*/}
                            {/*    </div>*/}
                            {/*    <div className="progress_icon_cont">*/}
                            {/*        <div></div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <p className={'tot duration'}>{formatDuration(song.duration)}</p>

                        </div>
                        <div className="player_action_cont">
                            <img src={like} alt=""/>
                            <img src={plalist} alt=""/>
                            <img src={repeat} alt=""/>
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