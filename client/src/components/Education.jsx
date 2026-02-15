import { useState } from "react";
import API from "../services/api";

const Education = ({ profile, refresh }) => {

const [form,setForm]=useState({
college:"",
degree:""
});

const [editId,setEditId]=useState(null);

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const save=async()=>{

if(editId){

await API.put(`/profile/education/${editId}`,form);

}else{

await API.post("/profile/education",form);

}

setForm({college:"",degree:""});

refresh();

};

const editEdu=(edu)=>{
setForm(edu);
setEditId(edu._id);
};

const deleteEdu=async(id)=>{
await API.delete(`/profile/education/${id}`);
refresh();
};

return(

<div className={`${profile.darkMode ? "bg-gray-900 text-white shadow-white" : "bg-white"} shadow rounded-lg p-6`}>

<h3 className="font-bold mb-3">Education</h3>

<input
name="college"
placeholder="College Name"
value={form.college}
onChange={handleChange}
className="border w-full p-2 mb-2"
/>

<input
name="degree"
placeholder="Degree (Example: BCA)"
value={form.degree}
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
profile?.education?.map(edu=>(

<div key={edu._id} className="border p-3 mt-3">

<p className="font-semibold">{edu.college}</p>

<p className="text-gray-500">{edu.degree}</p>

<button
onClick={()=>editEdu(edu)}
className="bg-green-500 text-white px-3 py-1 mr-2 mt-2"
>
Edit
</button>

<button
onClick={()=>deleteEdu(edu._id)}
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

export default Education;