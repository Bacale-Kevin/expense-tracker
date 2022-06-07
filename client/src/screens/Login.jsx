import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";

const formSchema = Yup.object().shape({
  username: Yup.string()
    .required("username is required")
    .min(3, "username must be atleast 2 char long"),
  password: Yup.string().required("password is required").min(3, "password must be at 3 char long"),
});

const Login = () => {
  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm(formOptions);

  const [togglePassVisibility, setTogglePassVisibility] = useState(false);

  const togglePasswordVisibilityHandler = () => {
    setTogglePassVisibility(!togglePassVisibility);
  };

  const onSubmit = async (userData) => {
    if (!userData) return {};

    // await loginUser(userData)
    //   .unwrap()
    //   .then((payload) => console.log("fulfilled", payload))
    //   .catch((error) => console.error("rejected", error));

    resetField("username");
    resetField("password");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto w-[400px] py-6 px-6 shadow-2xl">
        <h1 className="font-bold pb-4 text-xl text-center">Log in</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* username */}
          <div>
            <input
              className={`form-input ${
                errors.username?.type === "required" || errors.username?.type === "minLength"
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
              type="text"
              name="username"
              placeholder="Enter username"
              {...register("username", { required: true, minLengthd: 2 })}
            />
            {errors.username ? (
              <motion.div
                className="w-full flex text-red-400 text-xs pl-2 pt-1"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut" }}
              >
                {errors.username?.message}
              </motion.div>
            ) : (
              ""
            )}
          </div>

          {/* password */}
          <div className="relative">
            <input
              className={`form-input ${
                errors.password?.type === "required" || errors.password?.type === "minLength"
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
              type={togglePassVisibility ? "text" : "password"}
              placeholder="Please enter a password"
              name="password"
              {...register("password", { required: true, minLength: 3 })}
            />
            {!togglePassVisibility ? (
              <BsEye
                onClick={togglePasswordVisibilityHandler}
                className="absolute right-3 top-4 text-gray-500 cursor-pointer"
              />
            ) : (
              <BsEyeSlash
                onClick={togglePasswordVisibilityHandler}
                className="absolute right-3 top-4 text-gray-500 cursor-pointer"
              />
            )}
            {/* validation errors */}
            {errors.password ? (
              <motion.div
                className="w-full flex text-red-400 text-xs pl-2 pt-1"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut" }}
              >
                {errors.password?.message}
              </motion.div>
            ) : (
              ""
            )}
          </div>

          <div>
            <button
              type="submit"
              className="border rounded py-2 text-white bg-indigo-500 w-full hover:bg-indigo-700 transition-all ease-in-out focus:scale-95"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-xs py-6 mx-auto w-full text-center">
          Don't have an account ? <Link to="/signup" className="text-green-500 font-semibold underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
