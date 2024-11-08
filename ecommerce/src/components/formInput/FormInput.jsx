import { forwardRef } from "react";

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/display-name
const FormInput = forwardRef(({ ...props }, ref) => {
  return <input ref={ref} {...props} />;
});

export default FormInput;
