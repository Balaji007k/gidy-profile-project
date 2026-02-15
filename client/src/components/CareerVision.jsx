import { useState } from "react";
import API from "../services/api";

const CareerVision = ({ profile, refresh }) => {

const [edit,setEdit]=useState(false);

const [form,setForm]=useState({

careerGoal: profile?.careerVision?.careerGoal || "",

growingAs: profile?.careerVision?.growingAs || "",

domain: profile?.careerVision?.domain || ""

});

const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};

const save = async()=>{

await API.put("/profile/career",{

careerVision: form

});

refresh();

setEdit(false);

};

return(

<div className={`${profile.darkMode ? "bg-gray-900 text-white shadow-white" : "bg-white"} shadow rounded-lg p-6`}>

<h3 className="font-bold mb-3">

Career Vision

</h3>


{
edit ?

<>

<input

name="careerGoal"

value={form.careerGoal}

onChange={handleChange}

placeholder="Career Goal (Example: Senior Developer)"

className="border w-full p-2 mb-2"

/>

<input

name="growingAs"

value={form.growingAs}

onChange={handleChange}

placeholder="Growing As (Example: Full Stack Developer)"

className="border w-full p-2 mb-2"

/>

<input

name="domain"

value={form.domain}

onChange={handleChange}

placeholder="Domain (Example: Software Development)"

className="border w-full p-2 mb-2"

/>

<button

onClick={save}

className="bg-blue-500 text-white px-3 py-1"

>

Save

</button>

</>

:

<>

<p>

Career Goal: {profile?.careerVision?.careerGoal || "Not added"}

</p>

<p>

Growing As: {profile?.careerVision?.growingAs || "Not added"}

</p>

<p>

Domain: {profile?.careerVision?.domain || "Not added"}

</p>

<button

onClick={()=>setEdit(true)}

className="bg-gray-500 text-white px-3 py-1 mt-2"

>

Edit

</button>

</>

}

</div>

)

};

export default CareerVision;