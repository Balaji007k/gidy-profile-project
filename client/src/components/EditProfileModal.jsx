import { useState } from "react";
import API from "../services/api";

const EditProfileModal = ({ profile, close, refresh }) => {

const [form,setForm]=useState({

name:profile.name,
bio:profile.bio,
linkedin:profile.socialLinks.linkedin,
github:profile.socialLinks.github

});

const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

})

}

const save = async()=>{

await API.put("/",{

name:form.name,
bio:form.bio,
socialLinks:{
linkedin:form.linkedin,
github:form.github
}

})

refresh();
close();

}

return(

<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

<div className="bg-white p-6 rounded w-96">

<h2>Edit Profile</h2>

<input
name="name"
value={form.name}
onChange={handleChange}
className="border w-full mt-2"
/>

<textarea
name="bio"
value={form.bio}
onChange={handleChange}
className="border w-full mt-2"
/>

<input
name="linkedin"
value={form.linkedin}
onChange={handleChange}
className="border w-full mt-2"
/>

<input
name="github"
value={form.github}
onChange={handleChange}
className="border w-full mt-2"
/>

<button
onClick={save}
className="bg-blue-500 text-white mt-3 px-3 py-1"
>

Save

</button>

<button
onClick={close}
className="ml-2"
>

Cancel

</button>

</div>

</div>

)

}

export default EditProfileModal;