import { useState } from "react";
import API from "../services/api";

const ProfileHeader = ({ profile, refresh }) => {

const [edit,setEdit] = useState(false);

const [form,setForm] = useState({

name: profile.name || "",

bio: profile.bio || "",

linkedin: profile.socialLinks?.linkedin || "",

github: profile.socialLinks?.github || ""

});


const handleChange = (e)=>{

setForm({

...form,

[e.target.name]: e.target.value

});

};


const save = async()=>{

await API.put("/profile",{

name: form.name,

bio: form.bio,

socialLinks: {

linkedin: form.linkedin,

github: form.github

}

});

refresh();

setEdit(false);

};


const uploadImage = async (e)=>{

const file = e.target.files[0];

const formData = new FormData();

formData.append("profilePicture", file);

await API.put("/profile/upload-picture", formData);

refresh();

};


const toggleDarkMode = async()=>{

await API.put("/profile/darkmode");

refresh();

};


return(

<div className={`

rounded-xl shadow-md p-4

${profile.darkMode

? "bg-gray-900 text-white"

: "bg-white"

}

`}>


{/* TOP SECTION */}
<div className="flex items-start justify-between">


{/* LEFT SIDE */}
<div className="flex gap-4">


{/* IMAGE */}
<img
  src={`https://api-gidy-profile-project.onrender.com/${profile.profilePicture}`}
  onError={(e) => {
    e.target.onerror = null; // stop infinite loop
    e.target.src = "/images/default User.jpg";
  }}
  className="w-16 h-16 rounded-full object-cover"
/>


{/* NAME + EMAIL */}
<div>


{

edit ?

<>

<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Enter your name"

className="border p-1 w-full text-black mb-2"

/>


<input

type="file"

onChange={uploadImage}

className="text-sm"

/>

</>

:

<>

<h2 className="font-semibold text-lg">

{profile.name}

</h2>


<p className="text-gray-400 text-sm">

{profile.email}

</p>

</>

}


</div>

</div>


{/* DARK MODE BUTTON */}
<button

onClick={toggleDarkMode}

className="bg-black text-white px-3 py-1 rounded text-sm"

>

{profile.darkMode ? "Light" : "Dark"}

</button>


</div>



{/* BIO SECTION */}
<div className="mt-4">


{

edit ?

<textarea

name="bio"

value={form.bio}

onChange={handleChange}

placeholder="Enter your bio"

className="border p-2 w-full text-black mb-2"

/>

:

<p className="text-sm text-gray-500">

{profile.bio}

</p>

}


</div>



{/* SOCIAL LINKS */}
<div className="mt-3">


{

edit ?

<>

<input

name="linkedin"

value={form.linkedin}

onChange={handleChange}

placeholder="LinkedIn URL"

className="border p-1 w-full text-black mb-2"

/>


<input

name="github"

value={form.github}

onChange={handleChange}

placeholder="GitHub URL"

className="border p-1 w-full text-black"

/>

</>

:

<>

<p className="text-sm">

LinkedIn:

{

profile.socialLinks?.linkedin ||

" Not added"

}

</p>


<p className="text-sm">

GitHub:

{

profile.socialLinks?.github ||

" Not added"

}

</p>

</>

}


</div>



{/* BUTTONS */}
<div className="mt-4 flex gap-2">


{

edit ?

<>

<button

onClick={save}

className="bg-blue-500 text-white px-3 py-1 rounded text-sm"

>

Save

</button>


<button

onClick={()=>setEdit(false)}

className="bg-gray-500 text-white px-3 py-1 rounded text-sm"

>

Cancel

</button>

</>

:

<button

onClick={()=>setEdit(true)}

className="bg-blue-500 text-white px-3 py-1 rounded text-sm"

>

Edit Profile

</button>

}


</div>


</div>

);

};


export default ProfileHeader;