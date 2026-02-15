const Navbar = ({ profile })=>{

return(

<div className={`${profile.darkMode ? "bg-gray-800 text-white shadow-white" : "bg-white"} shadow p-4 flex justify-between`}>

<h1 className="font-bold text-xl">

Gidy Clone

</h1>

<button

onClick={()=>{

localStorage.removeItem("token");
window.location="/login"

}}

className="bg-red-500 text-white px-3 py-1 rounded"
>

Logout

</button>

</div>

)

}

export default Navbar;