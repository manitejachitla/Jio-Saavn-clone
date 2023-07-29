import playImg from "../../images/play.svg";
import pauseImg from "../../images/pause.svg";
import {formatDuration, getAlbumImg, getArtistName, getModifiedName} from "../MainCont/logic";
import downloadImg from "../../images/download-2.png";
import like from "../../images/like2.svg";
import React, {useContext} from "react";
import './common.less';
import AppContext from "../../config/Context";

const Song = ({song,isHome,showSongIcon}) => {
    let {currentSong,playSong,isPlaying,setisPlaying,addSongToStorage}=useContext(AppContext)
    const download = async (filename) => {
        let selected_song_link=song.downloadUrl
        let songlink=selected_song_link.slice(-1)[0].link
        const data = await fetch(songlink)
        const blob = await data.blob()
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', objectUrl)
        link.setAttribute('download', song.name+".mp3")
        link.style.display = 'none'

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
    }


    return (
      <div className={`ma_each_song ${currentSong && currentSong.id===song.id?"ma_each_selected_song":""}`}  key={song.id}>
          <img src={currentSong && currentSong.id===song.id?pauseImg:playImg} alt="play" onClick={()=>setisPlaying((ctt)=>!ctt)}/>
          <div className="each_song_name_cont" onClick={()=>playSong(song)}>
              {
                  (isHome || showSongIcon)?(
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
                              <p className={'artist'}>{getArtistName(song.primaryArtists)}</p>
                          </div>
                  ):""
              }
          </div>
          <div className="song_action_cont">
              <p className={'duration'}>{formatDuration(song.duration)}</p>
              <img src={like} alt="" className={'like'} title={'Like'} onClick={()=>{
                  addSongToStorage('like',song)
              }}/>
              <img src={downloadImg} alt="" className={'like'} title={'Download'} onClick={()=>{
                  download()
              }}/>
          </div>
      </div>
  )
}
export default Song;