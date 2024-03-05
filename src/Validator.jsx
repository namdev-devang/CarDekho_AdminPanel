import { event } from "jquery";
import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";

const Validator = () => {
  const [formValue, setFormValue] = useState({});
  const [fromErrors, setFormErrors] = useState({});

  const formValidate = new SimpleReactValidator();

  const handelChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
    setFormErrors({ ...fromErrors, [event.target.name]: null });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValidate.allValid()) {
      alert("done");
    } else {
      setFormErrors(formValidate.errorMessages);
      //   console.log(formValidate.errorMessages);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="lg:w-1/3 md:w-1/2 p-5 bg-white flex flex-col mx-auto w-full md:py-8 mt-8 md:mt-0">
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValue?.name}
              onChange={handelChange}
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {formValidate.message("name", formValue?.name, "required|url")}
            <p className="text-red-500">{fromErrors?.name}</p>
          </div>

          <div class="relative mb-4">
            <label for="age" class="leading-7 text-sm text-gray-600">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={formValue?.age}
              onChange={handelChange}
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {formValidate.message("age", formValue?.age, "required|integer")}
            <p>{fromErrors?.age}</p>
          </div>

          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formValue?.email}
              onChange={handelChange}
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {formValidate.message("email", formValue?.email, "required|email")}
            <p>{fromErrors?.email}</p>
          </div>

          <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
        </div>
      </form>
    </div>
  );
};

export default Validator;
