import React, {useContext, useEffect, useState} from "react";
import AppContext from "../../config/Context";
import {getAlbumImg, getArtistName, getModifiedName} from "../MainCont/logic";
import {useNavigate} from "react-router-dom";

const ItemList = ({type}) => {
  const {data,getData,setloading}=useContext(AppContext)
    const [renderItems,setrenderItems]=useState([])
  const navigate=useNavigate()
    useEffect(()=>{
        if (!data){
            console.log("here")
            getData()
            return;
        }
        let updatedItems=[]
        if (data && data[type+'s'] && Array.isArray(data[type+'s'])){
            updatedItems=data[type+'s']
        }
        if (type==='album'){
            let trendingAlbums=[]
            if (data.trending && data.trending.albums && Array.isArray(data.trending.albums)){
                data.trending.albums.forEach(alb=>{
                    if (!updatedItems.find(item=>item.id==alb.id)){
                        trendingAlbums.push(alb)
                    }
                })
            }
            updatedItems=[...trendingAlbums,...updatedItems]
        }
        setrenderItems(updatedItems)
        setloading(false)
        console.log({updatedItems})
    },[])
  return (
      <div className={'ma_il_main_cont'}>
        {
            renderItems.map(item=>(
                <div className={'ma_il_each_item album_on_hover_img'} key={item.id} onClick={()=>{
                    navigate('/'+type+'/'+item.id)
                }}>
                    <img src={getAlbumImg(item.image,true)} alt=""/>
                    <div className="item_details_cont">
                        <p className={'item_name'}>{getModifiedName(type==='album'?item.name:item.title)}</p>
                        <p className={'item_subtitle'}>{type==='album'?getArtistName(item.artists):getModifiedName(item.subtitle)}</p>
                    </div>

                    {/*<p className={'artist_name'}>{getArtistName(item.artists)}</p>*/}
                    {/*{item.title}*/}
                </div>
            ))
        }
      </div>
  )
}
export default ItemList;