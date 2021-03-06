/**
 * AddSolution handles when you want to add a solution using the algorithm.
 * This page appears when you click optimized schedule on solution dashboard.
 *
 * Bugs:
 *    - None currently known
 *
 * @authors Samuel Swanson, Anshul Bharath, Tianzhi Chen, 
 *          Joseph Heimel, Glennon Langan
 */
import { Button,Typography } from '@mui/material';
import { React, useEffect, useState } from 'react';
import './../../assets/styles/HomePage.css';
import './../../assets/styles/SideNav.css';
import './../../assets/styles/AddPages.css';
import SideNavigation from '../SideNavigation.js';
import TopBar from '../TopBar.js';
import DataViewer from '../DataViewer';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import * as AlgoService from 
'./../../services/algorithmServices/mainAlgorithmService';

const {
    CHANNEL_MODAL_FROM_MAIN,
    CHANNEL_MODAL_TO_MAIN
} = require('./../../utils/ipcChannels');

/**
 * The component that will be exported. This page will 4 lists of the Courses,
 * professors, rooms, and labs that have been added and that are in the database.
 * 
 * @param courses - the state of courses passed from App.js
 * @param rooms - the state of rooms passed from App.js
 * @param professors - the state of professors passed from App.js
 * @param labs - the state of labs passed from App.js
 * @param setCurrentPage - the function passed to redirect to the solution page
 * @returns - The exported component
 */
const AddSolution = ({ courses, rooms, professors, labs, setCurrentPage, times }) => {
    
    /**
    * State variables to send to the algorithm
    */
    const [courseSections, setCourseSections] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [selectedProfessors, setSelectedProfessors] = useState([]);
    const [selectedLabs, setSelectedLabs] = useState([]);
    const [roomScrollState, setRoomScrollState] = useState(0);
    const [courseScrollState, setCourseScrollState] = useState(0);
    const [professorScrollState, setProfessorScrollState] = useState(0);
    const [labsScrollState, setLabsScrollState] = useState(0);
    const [selectedTimes, setTimes] = useState(times);


    //======================== Algorithm Calculation Functions =================
    /**
     * This function runs when a course is selected. The number of sections of
     * the course will be determined by user input. 
     * 
     * There has to be an extra => so that this function can run on a onClick.
     * https://stackoverflow.com/questions/63960506/react-pass-value-to-onclick-function
     * 
     * @param course - a course that is being selected 
     */
    const addSectionsForClass = (course) => () => {
        let _payload = {
            request: 'COURSE_SECTIONS',
            program: course.program,
            number: course.number,
            message: 'Renderer PROMPT for Course Sections'
        }

        if(course.elementClassName === "item"){
            
            window.DB.send(CHANNEL_MODAL_TO_MAIN, _payload);
            window.DB.receive(CHANNEL_MODAL_FROM_MAIN, (response) => {
                if(response === "CANCEL"){
                    console.log('User cancelled')
                }
                else {
                    course.elementClassName = "item-selected"; 
                    console.log(response);
                    course.sections = response;
                    setCourseScrollState(document.querySelector('#courseScroll').scrollTop);
                    setCourseSections([...courseSections, course]);
                }
            });
        }else{
            course.elementClassName = "item";
            course.sections = 0;

            let id = course.id;
            setCourseScrollState(document.querySelector('#courseScroll').scrollTop);
            setCourseSections(courseSections.filter((remaingCourses) => remaingCourses.id !== id));
        }
    }

    const addSectionsForLabs = (course) => () => {
        let _payload = {
            request: 'COURSE_SECTIONS',
            program: course.program,
            number: course.number,
            message: 'Renderer PROMPT for Course Sections'
        }

        if(course.elementClassName === "item"){
            
            window.DB.send(CHANNEL_MODAL_TO_MAIN, _payload);
            window.DB.receive(CHANNEL_MODAL_FROM_MAIN, (response) => {
                if(response === "CANCEL"){
                    console.log('User cancelled')
                }
                else {
                    course.elementClassName = "item-selected"; 
                    console.log(response);
                    course.sections = response;
                    setLabsScrollState(document.querySelector('#labsScroll').scrollTop);
                    setSelectedLabs([...selectedLabs, course]);
                }
            });
        }else{
            course.elementClassName = "item";
            course.sections = 0;

            let id = course.id;
            setLabsScrollState(document.querySelector('#labsScroll').scrollTop);
            setSelectedLabs(selectedLabs.filter((remaingCourses) => remaingCourses.id !== id));
        }
    }

    /**
     * Selects a room to add for creating schedule. This function changes
     * the background color and adds it to the state variable holding rooms.
     * 
     * @param room - the room that was clicked
     */
    const selectRooms = (room) => () => {
        if(room.elementClassName === "item"){
            room.elementClassName = "item-selected";
            setRoomScrollState(document.querySelector('#roomScroll').scrollTop);
            setSelectedRooms([...selectedRooms, room]);
        }else{
            room.elementClassName = "item";

            let id = room.id;
            setRoomScrollState(document.querySelector('#roomScroll').scrollTop);
            setSelectedRooms(selectedRooms.filter((remaingRooms) => remaingRooms.id !== id));
        }
    }

    /**
     * Selects a professor to add for creating schedule. This function changes
     * the background color and adds it to the state variable holding professors.
     * 
     * @param professor - the professor that was clicked
     */
    const selectProfessors = (professor) => () => {
        if(professor.elementClassName === "item"){
            professor.elementClassName = "item-selected";
            setProfessorScrollState(document.querySelector('#professorScroll').scrollTop); 
            setSelectedProfessors([...selectedProfessors, professor]); 
        }else{
            professor.elementClassName = "item";

            let id = professor.id;
            setProfessorScrollState(document.querySelector('#professorScroll').scrollTop);
            setSelectedProfessors(selectedProfessors.filter((remaingProfs) => remaingProfs.id !== id));
        }
    }

    /**
     * Selects a lab to add for creating schedule. This function changes the
     * background color and adds it to the state variable holding labs.
     * 
     * @param lab - the lab that was clicked
     */
    const selectLabs = (lab) => () => {
        if(lab.elementClassName === "item"){
            lab.elementClassName = "item-selected";
            setLabsScrollState(document.querySelector('#labsScroll').scrollTop); 
            setSelectedLabs([...selectedLabs, lab]);
        }else{
            lab.elementClassName = "item";

            let id = lab.id;
            setLabsScrollState(document.querySelector('#labsScroll').scrollTop);
            setSelectedLabs(selectedLabs.filter((remaingLabs) => remaingLabs.id !== id));
        }
    }

    /**
     * This function is called when the Add Schedule button is clicked.
     * This function first checks to make sure it is possible to create an optimized
     * schedule given the data entered by the user
     * This function will reset all the cards to unselected style.
     */
    function createAndRefresh(){
        let haveValidInputs = validateInput();
        if(haveValidInputs){
            createNewSchedule();
        }
    }

    function validateInput(){
        if(courseSections.length <= 0){
            window.alert('Error! No courses have been selected.');
            return false;
        }

        if(selectedRooms.length <= 0){
            window.alert('Error! No rooms have been selected.');
            return false;
        }

        if(selectedProfessors.length <= 0){
            window.alert('Error! No professors have been selected.');
            return false;
        }

        if(selectedLabs.length <= 0){
            window.alert('Caution! No labs have been selected.');
        }

        if(!checkCourseLoadWithProfessors()){
            window.alert('Caution! You may have more course load than teacher load.');
        }

        if(!checkProfsCanTeach()){
            window.alert('Caution! You may have a professor that cannot teach a selected course.');
        }

        let confirmation = window.confirm('If you recieved caution messages, we may not be able to generate a schedule\nWould you like to continue?');
        if(confirmation){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * This function makes sure that the courses selected have a teach load less
     * than the professors selected.
     * 
     * @returns true if the the courses load is less or equal to the professors.
     */
    function checkCourseLoadWithProfessors(){
        let totalLoad = getCourseAndLabLoad();
        let totalProfLoad = getTotalProfLoad();

        if(totalLoad > totalProfLoad){
            return false;
        }
        else{
            return true;
        }
    }

    /**
     * This function returns the total load of credits for courses and labs.
     * 
     * @returns total load of courses and labs.
     */
    function getCourseAndLabLoad(){
        let coursesLoad = 0;
        let labsLoad = 0;

        for(let i=0; i<courseSections.length; i++){
            coursesLoad += parseInt(courseSections[i].credits);
        }

        for(let i=0; i<selectedLabs.length; i++){
            coursesLoad += parseInt(selectedLabs[i].credits);
        }

        return coursesLoad + labsLoad;
    }

    /**
     * This function returns the total of all professors teach load.
     * 
     * @returns total professors load.
     */
    function getTotalProfLoad(){
        let totalLoad = 0;

        for(let i=0; i<selectedProfessors.length; i++){
            totalLoad += parseInt(selectedProfessors[i].teachLoad);
        }
        return totalLoad;
    }

    /**
     * Checks to see if the professors each have at least one of the
     * courses selected.
     * 
     * @returns true if validated, false otherwise.
     */
    function checkProfsCanTeach(){
        let validate = false;

        for(let i=0; i<courseSections.length; i++){
            for(let j=0; j<selectedProfessors.length; j++){
                if(checkIndividualProfPrefs(courseSections[i].id, [...selectedProfessors[j].canTeach])){
                    validate = true;
                }
            }
        }
        return validate;
    }

    /**
     * This function checks to see that the professors canTeach array has
     * at least one of the courses.
     * 
     * @param id - the id we are checking for
     * @param canTeachArray - an array of course objects.
     * @returns true if the prof satisfies the can teach requirement.
     */
    function checkIndividualProfPrefs(id, canTeachArray){
        let result = false;

        for(let i=0; i<canTeachArray.length; i++){
            if(canTeachArray[i].id === id){
                result = true;
            }
        }
        
        return result;
    }
    
    /**
     * This function resets all the styles back to unselected state.
     */
    function resetStyles() {
        for(const key in courses){
            courses[key].elementClassName = 'item';
            courses[key].sections = 0;
        }

        for(const key in rooms){
            rooms[key].elementClassName = 'item';
        }

        for(const key in professors){
            professors[key].elementClassName = 'item';
        }

        for(const key in labs){
            labs[key].elementClassName = 'item';
        }
    }

    /**
     * Sends the selected values from this state to the algorithm service. 
     * The algo service will create a json from the variables and run the scheduling
     * algorithm. The current page will then move to the solution viewer page.
     */
    function createNewSchedule(){
        AlgoService.createJsonOfSelectedStates(courseSections, selectedRooms, selectedProfessors, selectedLabs, selectedTimes, 300, 3, 1);
        setCurrentPage('schedule');
    }


    //======================== AddSolution Components ==========================
    /**
     * This component is a view that lists out individual LabListItems.
     * 
     * @param labs - The state of labs that is passed down from App.js
     */
        const LabList = ({labs, onClickLab}) => {
        return(
            <div className='container' id = "labsScroll">
                <h1 className='sticky'>Labs</h1>
                {labs.map((currentLab, index) => (
                    <LabListItem key = {index} lab = {currentLab} onClickLab = {onClickLab} labs = {labs}/>
                ))}
            </div>
        );
    }
    
    /**
     * The component that will display an individual lab. 
     * These components will populate the LabList component.
     * 
     * @param lab - an individual lab
     */
    const LabListItem = ({lab, onClickLab, labs}) => {
        return(
            <div className = {lab.elementClassName}>
                <DataViewer id = {lab.id} dataState = {labs} sx = {{position:'absolute'}}>
                    <MoreHorizIcon style = {{float:"right"}}/>
                </DataViewer>
                <div onClick = {onClickLab(lab)}>
                    <h3>Lab: {lab?.name}</h3>
                    <p><em>Course: {lab?.number}</em></p>
                </div>
            </div>

        );
    }
    
    /**
     * This page will have a list of Labs that have been added and
     * the labs that are in the database.
     * 
     * @param labs - the state of labs passed from App.js
     */
     const LabAddPageContent = ({ labs, onClickLab}) => {
        return (
            <div className = "home">
                <div className = 'element-page'>
                    <LabList labs = {labs} onClickLab = {onClickLab}/>
                </div>
            </div>
        );
    }

    /**
     * This component is a view that lists out individual ProfessorListItems.
     * 
     * @param professors - The state of professors that is passed down from App.js
     * @returns          - React component that lists viewable professor components
     */
    const ProfessorList = ({professors, onClickProfessor}) => {
        return (
                <div className = 'container' id = "professorScroll">
                    <h1 className = "sticky">Professors</h1>                    
                    {professors.map((currentProfessor, index) => (
                        <ProfessorListItem key = {index} professor = {currentProfessor} onClickProfessor = {onClickProfessor} professors = {professors}/>
                    ))}
                </div>

        );
    }
   
   
    /**
     * The component that will display an individual professor.
     * These components will populate the ProfessorList component.
     * 
     * @param professor - An individual professor
     * @returns         - React component that displays a single professor component
     */
    const ProfessorListItem = ({professor, onClickProfessor, professors}) => {
        return (
            <div className = {professor.elementClassName}>
                <DataViewer id = {professor.id} dataState={professors} sx={{position:'absolute'}}>
                    <MoreHorizIcon style = {{float:"right"}}/>
                </DataViewer>
                <div onClick = {onClickProfessor(professor)}>
                    <h3>{professor.firstName} {professor.lastName}</h3>
                </div>
            </div>
        );
    }
  
    /**
     * This page will have a list of the Professors that have been added and
     * the professors that are in the database.
     * 
     * @param professors     - The state of professors passed from App.js
     */
    const ProfessorAddPageContent = ({professors, onClickProfessor}) => {
        return (
        <div className = "home">
            <div className = 'element-page'>
                <ProfessorList professors = {professors} onClickProfessor = {onClickProfessor}/> 
            </div>
        </div>
        );
    }

    /**
     * This component is a view that lists out individual RoomListItems.
     * 
     * @param rooms - The state of rooms that is passed down from App.js
     */
        const RoomList = ({ rooms, onClickRoom }) => {
            return(
                <div className = 'container' id = "roomScroll">
                    <h1 className = 'sticky'>Rooms</h1>
                    {rooms.map((currentRoom, index) => (
                        <RoomListItem key = {index} room = {currentRoom} onClickRoom = {onClickRoom} rooms = {rooms}/>
                    ))}
                </div>

            );
    }

    /**
     * The component that will display an individual room. 
     * These components will populate the RoomList component.
     * 
     * @param room - an individual room
     */
    const RoomListItem = ({ room, onClickRoom, rooms }) => {
        return(
        <div className = {room.elementClassName}>
            <DataViewer id = {room.id} dataState = {rooms} sx = {{position:'absolute'}}>
                <MoreHorizIcon style = {{float:"right"}}/>
            </DataViewer>
            <div onClick = {onClickRoom(room)}>
                <br></br>
                <h3>{room.building} {room.number} </h3>
            </div>
        </div>
        );
    }
    
    /**
     * This page will have a list of the Rooms that have been added and
     * the rooms that are in the database.
     * 
     * @param rooms - the state of rooms passed from App.js
     */
     const RoomAddPageContent = ({ rooms, onClickRoom }) => {
        return (
          <div className = "home">
              <div className = 'element-page'>
                  <RoomList rooms = {rooms} onClickRoom = {onClickRoom}/>
              </div>
          </div>
        );
    }

    /**
     * This component is a view that lists out individual CourseListItems.
     * 
     * @param courses - The state of courses that is passed down from App.js
     * @returns - The component that is a view listing out the CourseListItems
     */
    const CourseList = ({ courses, onClickCourse }) => {
        return (
            <div className='container' id = "courseScroll">
                <h1 className='sticky'>Courses</h1>                
                {courses.map((currentCourse, index) => (
                    <CourseListItem key = {index} course = {currentCourse} onClickCourse = {onClickCourse}/>
                ))}
            </div>

        );
    }


    /**
     * The component that will display an individual course. 
     * These components will populate the CourseList component.
     * 
     * @param course - an individual course
     * @returns - The component displaying an individual course.
     */
    const CourseListItem = ({ course, onClickCourse}) => {
        //addSectionsForClass(course)
        return (            
                <div className = {course.elementClassName} id = {course.id} >
                    <DataViewer id = {course.id} dataState = {courses} sx = {{position:'absolute'}}>
                        <MoreHorizIcon style = {{float:"right"}}/>
                    </DataViewer>
                    <div onClick = {onClickCourse(course)}>
                        <h3>{course.program} {course.number}</h3>
                        <p><em>Course Name</em> : {course.name}<br /></p>
                    </div>
                </div>
        );
    }

    /**
     * This page will have a list of the Courses that have been added and
     * the courses that are in the database.
     * 
     * @param courses - the state of courses passed from App.js
     * @returns - The exported component
     */
    const CourseAddPageContent = ({ courses, onClickCourse }) => {
        return (
            <div className = "home">
                <div className = 'element-page'>
                    <CourseList courses = {courses} onClickCourse = {onClickCourse}/>
                </div>
            </div>
        );
    }

    useEffect(() => {
        document.querySelector('#roomScroll').scrollTop = roomScrollState;
        document.querySelector('#courseScroll').scrollTop = courseScrollState;
        document.querySelector('#labsScroll').scrollTop = labsScrollState;
        document.querySelector('#professorScroll').scrollTop = professorScrollState;
        window.addEventListener('beforeunload', (event) => {
            // Cancel the event as stated by the standard.
            event.preventDefault();
            createAndRefresh();
          });
    }, [courseSections, selectedRooms, selectedProfessors, selectedLabs, roomScrollState, courseScrollState, labsScrollState, professorScrollState]);
    useEffect(() => { return () => resetStyles();}, []);
    return (
        <div>
            <SideNavigation></SideNavigation>

            <div id="main">
                <div className="main-div">
                    <TopBar></TopBar>

                    <div className="container-home">
                        <CourseAddPageContent courses={courses} onClickCourse={addSectionsForClass} ></CourseAddPageContent>
                        <RoomAddPageContent  rooms={rooms} onClickRoom={selectRooms}></RoomAddPageContent>
                        <ProfessorAddPageContent professors={professors} onClickProfessor={selectProfessors}></ProfessorAddPageContent>
                        <LabAddPageContent labs={labs} onClickLab={addSectionsForLabs}></LabAddPageContent>
                    </div>
                    
                    {/* generate schedule button */}
                    <Button variant="contained" sx={{position:'absolute', bottom:'12vh', right:'2.5vw'}} onClick={createAndRefresh}>
                        <Typography variant="text" color="secondary">Generate Schedule</Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddSolution;