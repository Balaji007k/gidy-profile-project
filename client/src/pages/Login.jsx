import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({

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

    const res = await API.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);

    navigate("/profile");

  };


  return (

    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-center mb-6">

          Login

        </h2>


        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">

            Login

          </button>


          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
          >

            Create Account

          </button>


        </form>

      </div>

    </div>

  );

};

export default Login;