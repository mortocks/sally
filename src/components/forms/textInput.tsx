import { type InputHTMLAttributes, forwardRef } from "react";
import { type FieldError } from "react-hook-form";
import Error from "./error";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isLoading?: boolean;
  error?: string | FieldError;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
  className?: string;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      leftAccessory,
      rightAccessory,
      ...props
    }: InputProps,
    ref,
  ) => {
    const errorMessage: string | undefined =
      typeof error === "string" ? error : error?.message;

    return (
      <div className={`form-control w-full ${className}`}>
        <label className="label">
          {label && <span className="label-text">{label}</span>}
          {/* <span className="label-text-alt">Top Right label</span> */}
        </label>
        <div className="input input-bordered flex w-full grow rounded-none">
          {leftAccessory}
          <input
            type="text"
            className="flex grow bg-transparent focus:outline-none"
            {...props}
            ref={ref}
          />
          {rightAccessory}
        </div>
        <Error message={errorMessage} />
        {/* <label className="label">
        <span className="label-text-alt">Bottom Left label</span>
        <span className="label-text-alt">Bottom Right label</span>
      </label> */}
      </div>
    );
  },
);
TextInput.displayName = "TextInput";
export default TextInput;
