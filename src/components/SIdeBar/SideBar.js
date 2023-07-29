import React, {Component, useContext, useEffect} from 'react';
import usericon from './../../images/user.png'
import home from './../../images/home.svg'
import playlist from './../../images/playlist.svg'
import artist from './../../images/profile.svg'
import like from '../../images/like2.svg'
import albums from './../../images/albums.svg'
import './style.less'
import {Link, useLocation} from "react-router-dom";
function SideBar() {
    const location=useLocation()
    useEffect(() => {
        console.log({location})
    }, [location]);
    const side_items=[
                {name:"Home",icon:home,path:'/'},
                {name:"Playlist",icon:playlist,path:'/playlists'},
                {name:"Albums",icon:albums,path:'/albums'},
                {name:"Recent",icon:artist,path:'/recent'},
                {name:"Liked",icon:like,path:'/liked'},
            ]
    return (
        <div className={'ma_sidebar_cont'}>
            <img src={usericon} alt="" className={'user_icon'}/>
            <p className="user_name">Maniteja</p>
            <p className="user_email">manitejachitla111@gmail.com</p>
            <div className="ma_sidebar_browse_cont">
                <p className={'heading'}>Browse</p>
                {
                    side_items.map(item=>
                        <div className={`browse_out ${location && location.pathname && location.pathname===item.path?"browse_out_active":""}`}>
                            <Link to={item.path}>
                                <p className="browse_item"><img src={item.icon} alt=""/>{item.name}</p>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>

    );
}

export default SideBar;