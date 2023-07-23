import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Axios from "../../config/Axios";
import Song from "./Song";
import {formatDuration, getAlbumImg} from "../MainCont/logic";
import AppContext from "../../config/Context";
const Album = ({type}) => {
    let {currentSong,playSong,queue,setQueue}=useContext(AppContext)
    const {id}=useParams()
    const [albumdata,setAlbumData]=useState(null)
    useEffect(()=>{
        let getData=async ()=>{
            let data=await Axios.get(`/${type}s?id=${id}`)
            setAlbumData(data)
            setQueue(data.songs)
        }
        getData()
    },[])
    const getTotalDuration=(arr)=>{
        let tot=0
        arr.forEach(item=>tot=tot+parseInt(item.duration))
        return formatDuration(tot)
    }
  return (
          albumdata?(
              <div className="ma_album_main_cont">
                  <div className="album_header_cont">
                      <img src={getAlbumImg(albumdata.image,true)} alt=""/>
                      <div className="album_info_cont">
                          <p className={'album_name'}>{albumdata.name}
                              <span>{albumdata.year?" ("+albumdata.year+") ":""}</span>
                          </p>
                          <p className={'album_artist'}>by {type==='album'?albumdata.primaryArtists:albumdata.firstname}</p>
                          <p className={'copy_right'}>{albumdata.songs.length} Songs - {getTotalDuration(albumdata.songs)}</p>
                          <p className={'copy_right'}>{albumdata.songs[0]?.copyright}</p>
                          <button className={'play_btn'} onClick={()=>playSong(albumdata.songs[0])}>Play</button>
                      </div>
                  </div>
                  {
                      albumdata ?(
                          <>
                              {
                                  albumdata.songs.map(song=>(
                                      <Song song={song} key={song.id}/>
                                  ))
                              }
                          </>
                      ):""
                  }
              </div>
          ):""
  )
}
export default Album;