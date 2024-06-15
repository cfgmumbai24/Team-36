import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { sendContactForm } from "../../lib/api"; // Ensure the path is correct

const FormComponent = ({ products }) => {
  const initValues = {
    name: "",
    email: "",
    subject: "Product Inquiry",
    message: "Inquiry about the products.",
  };
  const initState = { isLoading: false, error: "", values: initValues };

  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));
  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isLoading: true }));

    const formData = { ...values, products };

    console.log(formData);

    try {
      await sendContactForm(formData);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
      toast({
        title: "Failed to send message.",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-customOrange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;