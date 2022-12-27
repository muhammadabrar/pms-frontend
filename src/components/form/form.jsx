import React from "react";
import TextInput from "./textInput";

const Form = () => {
  return (
    <>
    <h1 className="text-2xl font-bold pb-2">Form inputs</h1>
      <div className="mb-6">

        <TextInput label={'larger-input'} size="lg" placeholder={"larger-input"} />
      </div>
      <div className="mb-6">
        <TextInput label={'input'} placeholder={"larger-input"} />
      </div>
      <div className="mb-6">
        <TextInput label={'small-input'} size="sm" placeholder={"larger-input"} />
      </div>
      <div className="mb-6">
        <TextInput helper={"helper with err"} label={'input with err and helper'} error={true} placeholder={"larger-input"} />
      </div>
    </>
  );
};

export default Form;
