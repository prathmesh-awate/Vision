import React from "react";
import LandingPage from "../components/LandingPage";
import HomePage from "../pages/Home/HomePage";
import Demo from "../pages/Demo/Demo"
import {BrowserRouter,Routes, Route} from 'react-router-dom';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/demo" element={<Demo/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;