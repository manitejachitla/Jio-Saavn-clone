import React, {Component} from 'react';
import usericon from './../../images/usericon.svg'
import home from './../../images/home.svg'
import playlist from './../../images/playlist.svg'
import artist from './../../images/profile.svg'
import albums from './../../images/albums.svg'
import './style.less'
import {Link} from "react-router-dom";
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            side_items:[
                {name:"Home",icon:home,path:'/'},
                {name:"Playlist",icon:playlist,path:'/'},
                {name:"Artist",icon:artist,path:'/'},
                {name:"Albums",icon:albums,path:'/'},
            ]
        }
    }

    render() {
        return (
            <div className={'ma_sidebar_cont'}>
                <img src={usericon} alt="" className={'user_icon'}/>
                <p className="user_name">Maniteja</p>
                <p className="user_email">manitejachitla111@gmail.com</p>
                <div className="ma_sidebar_browse_cont">
                    <p className={'heading'}>Browse</p>
                    {
                        this.state.side_items.map(item=>
                            <Link to={item.path}>
                                <p className="browse_item"><img src={item.icon} alt=""/>{item.name}</p>
                            </Link>
                        )
                    }
                </div>
            </div>

        );
    }
}

export default SideBar;