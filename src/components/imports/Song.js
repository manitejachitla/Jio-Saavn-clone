import playImg from "../../images/play.svg";
import {formatDuration, getAlbumImg, getModifiedName} from "../MainCont/logic";
import like from "../../images/like.svg";
import React from "react";
import './common.less';

const Song = ({currentSong,song,playSong}) => {
  return (
      <div className={`each_song ${currentSong && currentSong.id===song.id?"each_selected_song":""}`} onClick={()=>playSong(song)} key={song.id}>
          <img src={playImg} alt=""/>
          <div className="each_song_name_cont">
              <img src={getAlbumImg(song.image)}/>
              <div className="each_song_name">
                  <p>{getModifiedName(song.name)}</p>
                  {song.album && song.album.name ?(
                      <p>{getModifiedName(song.album.name)}</p>
                  ):""}
              </div>
          </div>
          <p className={'duration'}>{formatDuration(song.duration)}</p>
          <img src={like} alt="" className={'like'}/>
      </div>
  )
}
export default Song;