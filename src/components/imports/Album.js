import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Axios from "../../config/Axios";
import Song from "./Song";
import {formatDuration, getAlbumImg} from "../MainCont/logic";
import AppContext from "../../config/Context";
const Album = ({type}) => {
    let {currentSong,playSong,queue,setQueue,setloading}=useContext(AppContext)
    const {id}=useParams()
    const [albumdata,setAlbumData]=useState(null)
    const [albumSongs,setAlbumSongs]=useState([])
    useEffect(()=>{
        let getData=async ()=>{
            let data=await Axios.get(`/${type}s?id=${id}`)
            if (data){
                setAlbumData(data)
                setQueue(data.songs)
                setloading(false)
            }
        }
        if (type==='playlist' || type==='album'){
            getData()
        } else {
            let music_data=window.localStorage.getItem('music'),songs_data=[]
            if (music_data){
                music_data=JSON.parse(music_data)
                if (music_data && music_data[type] && Array.isArray(music_data[type])){
                    songs_data=music_data[type].reverse()
                }
                if(songs_data.length){
                    let albData={id:10,songs:songs_data}
                    setAlbumData(albData)
                    setAlbumSongs(albumSongs)
                    setQueue(songs_data)
                }
                setloading(false)
            }
        }

    },[])
    const getTotalDuration=(arr)=>{
        let tot=0
        arr.forEach(item=>tot=tot+parseInt(item.duration))
        return formatDuration(tot)
    }
    console.log({albumdata}, albumdata && albumdata.songs?Array.isArray(albumdata.songs):"")
  return (
          albumdata?(
              <div className="ma_album_main_cont">
                  <div className="album_header_cont">
                      {
                          type==='playlist' || type==='album' ?(
                              <>
                                  <img src={getAlbumImg(albumdata.image,true)} alt=""/>
                                  <div className="album_info_cont">
                                      <p className={'album_name'}>{albumdata.name}
                                          <span>{albumdata.year?" ("+albumdata.year+") ":""}</span>
                                      </p>
                                      <p className={'album_artist'}>by {type==='album'?albumdata.primaryArtists:""} {type==='playlist'?albumdata.firstname:""}</p>
                                      <p className={'copy_right'}>{albumdata.songs.length} Songs - {getTotalDuration(albumdata.songs)}</p>
                                      <p className={'copy_right'}>{albumdata.songs[0]?.copyright}</p>
                                      <button className={'play_btn'} onClick={()=>playSong(albumdata.songs[0])}>Play</button>
                                  </div>
                              </>
                          ):(
                              <>
                                  <p className={'album_name'}>{type==='like'?"Liked Songs":"Recently Played"}</p>
                              </>
                          )
                      }
                  </div>
                  {
                    albumdata.songs && Array.isArray(albumdata.songs) ?(
                          <>
                              {
                                  albumdata.songs.map(song=>(
                                      <Song song={song} key={song.id} showSongIcon={type!=='album'}/>
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