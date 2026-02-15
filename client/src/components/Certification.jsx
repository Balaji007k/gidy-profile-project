import { useState } from "react";
import API from "../services/api";

const Certification = ({ profile, refresh }) => {

const [form,setForm]=useState({
title:"",
company:"",
year:""
});

const [editId,setEditId]=useState(null);

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const addOrUpdate = async()=>{

if(editId){

await API.put(`/profile/certification/${editId}`,form);

setEditId(null);

}else{

await API.post("/profile/certification",form);

}

setForm({title:"",company:"",year:""});

refresh();

};

const editCert=(cert)=>{

setForm(cert);

setEditId(cert._id);

};

const deleteCert=async(id)=>{

await API.delete(`/profile/certification/${id}`);

refresh();

};

return(

<div className={`${profile.darkMode ? "bg-gray-900 text-white shadow-white" : "bg-white"} shadow rounded-lg p-6`}>

<h3 className="font-bold mb-3">Certification</h3>

<input
name="title"
placeholder="Certification Title (Example: Full Stack Developer)"
value={form.title}
onChange={handleChange}
className="border w-full p-2 mb-2"
/>

<input
name="company"
placeholder="Issued by (Example: Meta, Google)"
value={form.company}
onChange={handleChange}
className="border w-full p-2 mb-2"
/>

<input
name="year"
placeholder="Year (Example: 2025)"
value={form.year}
onChange={handleChange}
className="border w-full p-2 mb-2"
/>

<button
onClick={addOrUpdate}
className="bg-blue-500 text-white px-4 py-1 rounded"
>

{editId ? "Update" : "Add"}

</button>


{
profile?.certifications?.map(cert=>(

<div key={cert._id} className="border p-3 mt-3 rounded">

<p className="font-semibold">{cert.title}</p>

<p className="text-gray-500">{cert.company} • {cert.year}</p>

<button
onClick={()=>editCert(cert)}
className="bg-green-500 text-white px-3 py-1 mr-2 mt-2"
>
Edit
</button>

<button
onClick={()=>deleteCert(cert._id)}
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

export default Certification;