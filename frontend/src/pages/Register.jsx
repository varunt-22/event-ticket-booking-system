import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Register() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setError("");

      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Registration failed"
      );
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Register
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

        {error && (
          <p className="text-red-500 text-center">
            {error}
          </p>
        )}
      </form>
    </div>
  </div>
);
}