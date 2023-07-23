import playImg from "../../images/play.svg";
import pauseImg from "../../images/pause.svg";
import {formatDuration, getAlbumImg, getModifiedName} from "../MainCont/logic";
import like from "../../images/like2.svg";
import React, {useContext} from "react";
import './common.less';
import AppContext from "../../config/Context";

const Song = ({song,isHome}) => {
    let {currentSong,playSong,isPlaying,setisPlaying}=useContext(AppContext)
  return (
      <div className={`ma_each_song ${currentSong && currentSong.id===song.id?"ma_each_selected_song":""}`} onClick={()=>playSong(song)} key={song.id}>
          <img src={currentSong && currentSong.id===song.id?pauseImg:playImg} alt="play" onClick={()=>setisPlaying((ctt)=>!ctt)}/>
          <div className="each_song_name_cont">
              {
                  isHome?(
                      <img src={getAlbumImg(song.image)}/>
                  ):""
              }
              <div className={isHome?"each_home_song_name":"each_song_name"}>
                  <p className={'song_name'}>{getModifiedName(song.name)}</p>
                  {isHome && song.album && song.album.name ?(
                      <p className={'song_album'}>{getModifiedName(song.album.name)}</p>
                  ):""}
              </div>
              {
                  !isHome?(
                          <div className="song_middle_cont">
                              <p className={'artist'}>{song.primaryArtists}</p>
                          </div>
                  ):""
              }
          </div>
          <div className="song_action_cont">
              <p className={'duration'}>{formatDuration(song.duration)}</p>
              <img src={like} alt="" className={'like'}/>
          </div>
      </div>
  )
}
export default Song;