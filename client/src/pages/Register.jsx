import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: ""

  });


  const handleChange = (e) => {

    setForm({

      ...form,
      [e.target.name]: e.target.value

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await API.post("/auth/register", form);

    localStorage.setItem("token", res.data.token);

    navigate("/profile");

  };


  return (

    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-center mb-6">

          Register

        </h2>


        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />


          <input
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />


          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />


          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">

            Register

          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
          >

            Already have an account? Login
            
          </button>

        </form>

      </div>

    </div>

  );

};

export default Register;