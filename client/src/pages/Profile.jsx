import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import CareerVision from "../components/CareerVision";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Certification from "../components/Certification";
import TopSkill from "../components/TopSkill";

const Profile = ()=>{

const [profile,setProfile]=useState(null);

useEffect(()=>{

fetchProfile();

},[]);

const fetchProfile = async()=>{

try{

const res = await API.get("/profile");

//console.log(res.data);

setProfile(res.data);

}

catch(err){

console.log(err.response);

}

};

if(!profile) return <div>Loading...</div>

return(

<div className={`${profile.darkMode ? "bg-gray-900 text-white":"bg-gray-100"} min-h-screen`}>

<Navbar profile={profile}/>

<div className="max-w-5xl mx-auto p-4 space-y-4">

<ProfileHeader profile={profile} refresh={fetchProfile}/>

<CareerVision profile={profile} refresh={fetchProfile}/>

<Skills profile={profile} refresh={fetchProfile}/>

<Experience profile={profile} refresh={fetchProfile}/>

<Education profile={profile} refresh={fetchProfile}/>

<TopSkill profile={profile}/>

<Certification profile={profile} refresh={fetchProfile}/>

</div>

</div>

)

}

export default Profile;