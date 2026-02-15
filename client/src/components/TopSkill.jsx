import { useEffect, useState } from "react";
import API from "../services/api";

const TopSkill = ({profile})=>{

const [skill,setSkill]=useState(null);

useEffect(()=>{

fetchSkill();

},[profile]);

const fetchSkill = async()=>{

const res = await API.get("/profile/top-skill");

setSkill(res.data);

};

if(!skill) return null;

return(

<div className={`${profile.darkMode ? "bg-gray-800 text-white shadow-white" : "bg-yellow-100"} shadow p-4 rounded`}>

🏆 Top Skill

<p className="font-bold">

{skill.name}

</p>

<p>

Endorsements: {skill.endorsements}

</p>

</div>

)

}

export default TopSkill;