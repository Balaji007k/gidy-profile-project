import { useState } from "react";
import API from "../services/api";

const Experience = ({ profile, refresh }) => {

const [form,setForm]=useState({
company:"",
role:""
});

const [editId,setEditId]=useState(null);

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const save=async()=>{

if(editId){

await API.put(`/profile/experience/${editId}`,form);

setEditId(null);

}else{

await API.post("/profile/experience",form);

}

setForm({company:"",role:""});

refresh();

};

const editExp=(exp)=>{
setForm(exp);
setEditId(exp._id);
};

const deleteExp=async(id)=>{
await API.delete(`/profile/experience/${id}`);
refresh();
};

return(

<div className={`${profile.darkMode ? "bg-gray-900 text-white shadow-white" : "bg-white"} shadow rounded-lg p-6`}>

<h3 className="font-bold mb-3">Experience</h3>

<input
name="company"
placeholder="Company Name (Example: Infosys)"
value={form.company}
onChange={handleChange}
className="border w-full p-2 mb-2"
/>

<input
name="role"
placeholder="Role (Example: Frontend Developer)"
value={form.role}
onChange={handleChange}
className="border w-full p-2 mb-2"
/>

<button
onClick={save}
className="bg-blue-500 text-white px-4 py-1"
>

{editId ? "Update" : "Add"}

</button>


{
profile?.experience?.map(exp=>(

<div key={exp._id} className="border p-3 mt-3">

<p className="font-semibold">{exp.company}</p>

<p className="text-gray-500">{exp.role}</p>

<button
onClick={()=>editExp(exp)}
className="bg-green-500 text-white px-3 py-1 mr-2 mt-2"
>
Edit
</button>

<button
onClick={()=>deleteExp(exp._id)}
className="bg-red-500 text-white px-3 py-1 mt-2"
>
Delete
</button>

</div>

))
}

</div>

)

};

export default Experience;