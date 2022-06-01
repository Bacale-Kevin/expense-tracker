import React from "react";
import { useForm } from "react-hook-form";
import List from "./List";

import { default as api } from "../store/apiSlice";

import { motion } from "framer-motion";

const Form = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) return {};
    await addTransaction(data).unwrap();

    resetField("name");
    resetField("amount");
  };

  return (
    <div className="form max-w-sm max-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name", { required: true, minLength: 2 })}
              placeholder="Salary, House Rent, SIP"
              className={`form-input ${
                errors.name?.type === "required" || errors.name?.type === "minLength"
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            />
            {errors.name?.type === "required" && (
              <motion.div
                className="w-full flex text-red-400 text-xs pl-2 pt-1"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut" }}
              >
                Please enter the name of the transaction
              </motion.div>
            )}
            {errors.name?.type === "minLength" && (
              <motion.div
                className="w-full flex text-red-400 text-xs pl-2 pt-1"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut" }}
              >
                This field should be atleast 2 characters long *
              </motion.div>
            )}
          </div>
          <select className="form-input" {...register("type", { required: true })}>
            <option value="Investment" defaultValue>
              Investment
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              {...register("amount", { required: true, min: 2 })}
              placeholder="Amount"
              className={`form-input ${
                errors.name?.type === "required" ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.name?.type === "required" && (
              <motion.div
                className="w-full flex text-red-400 text-xs pl-2 pt-1"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut" }}
              >
                Please enter the amount of the transaction
              </motion.div>
            )}
          </div>

          <div className="submit-btn">
            <motion.button className="border py-2 text-white bg-indigo-500 w-full hover:bg-indigo-700 transition-all ease-in-out focus:scale-95">
              Make Transaction
            </motion.button>
          </div>
        </div>
      </form>

      <List />
    </div>
  );
};

export default Form;
