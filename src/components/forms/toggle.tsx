import { type InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, value, onChange, defaultChecked, ...rest }, ref) => {
    const [checked, setChecked] = React.useState(defaultChecked);
    return (
      <div onClick={() => setChecked(!checked)} style={{ cursor: "pointer" }}>
        <input
          style={{ display: "none" }}
          ref={ref}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        [{checked ? "X" : " "}]{label}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";
export default Toggle;
