import React from 'react';
import './../assets/styles/HomePage.css'
import { NotificationsNone, Settings} from '@mui/icons-material';
import {Button, Typography} from '@mui/material';
import DataViewer from './DataViewer.js';

/**
 * Create a topbar for the application that includes a Name, logo, and profile image.
 * @returns the TopBar component.
 */
const TopBar = () => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">ClassySchedule</span>
                </div>
                <div className="topRight">
                    <div className="topBarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topBarIconContainer">
                        <Settings/>
                    </div>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F114%2Fthumb-1920-114874.jpg&f=1&nofb=1" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}

/**
 * This component builds and returns the boxes that displays info on the current state on the homepage.
 * @param courses - the courses state.
 * @param labs - the labs state.
 * @param professors - the professors state.
 * @param rooms - the rooms state.
 */
const ComponentsInfo = ({courses, labs, professors, rooms}) => {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Courses</span>
                <div className="featuredInfo">
                    <span className="featuredValue">{courses.length}</span>
                </div>

            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Labs</span>
                <div className="featuredInfo">
                    <span className="featuredValue">{labs.length}</span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Professors</span>
                <div className="featuredInfo">
                    <span className="featuredValue">{professors.length}</span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Rooms</span>
                <div className="featuredInfo">
                    <span className="featuredValue">{rooms.length}</span>
                </div>
            </div>

            
            { courses[0] != undefined ?
            <DataViewer id={courses[0].id} dataState={courses} sx={{position:'absolute', bottom:'12vh', left:'2.5vw'}}>
                <Button variant="contained">
                    <Typography variant="text" color="secondary">Test data viewer</Typography>
                </Button>
            </DataViewer>:null
            }
        </div>
    )

}

/**
 * This component creates and styles the dashboard.
 */
const Dashboard = ({courses, labs, professors, rooms}) => {
    return (
        <div className="home">
            <ComponentsInfo courses={courses} labs={labs} professors={professors} rooms={rooms}/>
        </div>
    )
}

export function HomePage ({courses, labs, professors, rooms})
{
    
    return (
        
    <div className="main-div">
        <TopBar></TopBar>
        <br />
        <br />
        <div className="container-top-text">
            <h4> Hello User, here are your latest stats...</h4>
        </div>
        <div className="container-home">
            <Dashboard courses={courses} labs={labs} professors={professors} rooms={rooms}/>
        </div>
    </div>
    );
}

export default HomePage;