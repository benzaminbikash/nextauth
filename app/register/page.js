"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/dashboard");
    }
  }, [sessionStatus, router]);
  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const buttonHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      alert("User Created Successfully!");
      router.push("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <div>
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
              Registration
            </h1>
            <form>
              <div className="mb-4">
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={onChangeHandler}
                  className="text-black shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Cena"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={onChangeHandler}
                  className="text-black shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  for="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={onChangeHandler}
                  className="text-black shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  for="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Confirmation Password
                </label>
                <input
                  type="password"
                  id="cpassword"
                  onChange={onChangeHandler}
                  className=" text-black shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your confirmation password"
                  required
                />
              </div>

              <button
                onClick={buttonHandler}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
