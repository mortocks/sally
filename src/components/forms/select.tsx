import { type InputHTMLAttributes, forwardRef } from "react";
import Error from "./error";
import { placeholder } from "drizzle-orm";

type Option = {
  label?: string;
  value: string;
};

export interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  isLoading?: boolean;
  error?: string;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
  options?: Option[];
  nullLabel?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, InputProps>(
  ({ label, error, placeholder, options = [], ...props }: InputProps, ref) => (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        {label && <span className="label-text">{label}</span>}
        {/* <span className="label-text-alt">Top Right label</span> */}
      </label>
      <select
        className="select select-bordered mb-2 w-full
      max-w-xs"
        {...props}
        ref={ref}
      >
        {placeholder && <option disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
      <Error message={error} />
    </div>
  ),
);
Select.displayName = "Select";
export default Select;
