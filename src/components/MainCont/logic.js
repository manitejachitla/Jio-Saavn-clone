import Axios from "../../config/Axios";

export function getArtistName(artists){
    if (Array.isArray(artists)){
        artists=artists.slice(0,1)
        return artists.map(item=>item.name).toString()
    } else {
        return artists
    }
}
export function getModifiedName(name){
    return name.split('(')[0] || ''
}
export function getAlbumImg(album,highQuality){
    let ind=-2;
    if (highQuality) ind=ind+1;
    return album.slice(ind)[0].link
}
export async function getResultDetails(type,id){
    let data=await Axios.get(type+'s?id='+id)
    return data
}
export function formatDuration(duration){
    let min=parseInt(duration/60)
    let sec=duration-(min*60)
    sec=sec.toFixed(0)
    if (sec.length===1){
        sec="0"+sec
    }
    return min+':'+sec
}