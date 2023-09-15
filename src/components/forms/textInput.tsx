import { type InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isLoading?: boolean;
  error?: string;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, name, error, leftAccessory, rightAccessory, ...props }: InputProps,
    ref,
  ) => (
    <div className="form-control w-full">
      <label className="label">
        {label && <span className="label-text">{label}</span>}
        {/* <span className="label-text-alt">Top Right label</span> */}
      </label>
      <div className="input input-bordered flex w-full grow">
        {leftAccessory}
        <input
          type="text"
          className="flex grow bg-transparent focus:outline-none"
          {...props}
          ref={ref}
        />
        {rightAccessory}
      </div>
      {error && <span className=" py-1 text-sm text-red-500">{error}</span>}
      {/* <label className="label">
        <span className="label-text-alt">Bottom Left label</span>
        <span className="label-text-alt">Bottom Right label</span>
      </label> */}
    </div>
  ),
);
TextInput.displayName = "TextInput";
export default TextInput;
