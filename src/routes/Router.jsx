import React from "react";
import LandingPage from "../components/LandingPage";
import HomePage from "../pages/Home/HomePage";

import {BrowserRouter,Routes, Route} from 'react-router-dom';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;