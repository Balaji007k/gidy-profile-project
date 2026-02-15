import { useState } from "react";
import API from "../services/api";

const Skills = ({profile,refresh})=>{

const [skill,setSkill]=useState("");

const addSkill = async()=>{

await API.post("/profile/skill",{

name:skill

});

setSkill("");

refresh();

};

const endorseSkill = async(id)=>{

await API.put("/profile/endorse",{

skillId:id

});

refresh();

};

const deleteSkill = async(id)=>{

await API.delete(`/profile/skill/${id}`);

refresh();

};

return(

<div className={`${profile.darkMode ? "bg-gray-900 text-white shadow-white" : "bg-white"} shadow rounded-lg p-4`}>

<h3 className="font-bold">

Skills

</h3>

<div className="flex gap-2 mt-2">

<input

value={skill}

onChange={(e)=>setSkill(e.target.value)}

className="border p-1 w-full"

placeholder="Add a new skill (Example: React)"

/>

<button

onClick={addSkill}

className="bg-blue-500 text-white px-3"
>

Add

</button>

</div>

{

profile.skills.map((skill)=>{

return(

<div
key={skill._id}
className="flex justify-between border p-2 mt-2"
>

<span>

{skill.name} 👍 {skill.endorsements}

</span>

<div>

<button
onClick={()=>endorseSkill(skill._id)}
className="bg-green-500 text-white px-2 mr-2"
>

Endorse

</button>

<button
onClick={()=>deleteSkill(skill._id)}
className="bg-red-500 text-white px-2"
>

Delete

</button>

</div>

</div>

)

})

}

</div>

)

}

export default Skills;