import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Axios from "../../config/Axios";
import Song from "./Song";
import {formatDuration, getAlbumImg} from "../MainCont/logic";
const Album = () => {
    const {id}=useParams()
    const [albumdata,setAlbumData]=useState(null)
    useEffect(()=>{
        let getData=async ()=>{
            let data=await Axios.get('/albums?id='+id)
            setAlbumData(data)
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
                          <p className={'album_artist'}>by {albumdata.primaryArtists}</p>
                          <p className={'copy_right'}>{albumdata.songs.length} Songs - {getTotalDuration(albumdata.songs)}</p>
                          <p className={'copy_right'}>{albumdata.songs[0]?.copyright}</p>
                          <button className={'play_btn'}>Play</button>
                      </div>
                  </div>
                  {
                      albumdata ?(
                          <>
                              {
                                  albumdata.songs.map(song=>(
                                      <Song song={song} />
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