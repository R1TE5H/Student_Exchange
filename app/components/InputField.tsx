interface Props {
  label: string;
  label_color?: string;
  name: string;
  type: string;
  register: any;
  errors: any;
}

const InputField = ({
  label,
  label_color,
  name,
  type,
  register,
  errors,
}: Props) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className={`font-bold ${label_color ? label_color : "text-gray-700"}`}
    >
      {label}
    </label>
    <input
      id={name}
      {...register(name)}
      type={type}
      className="border p-3 rounded bg-gray-100 text-gray-900 w-full"
    />
    {errors[name] && (
      <span className="text-red-500 text-sm">{errors[name].message}</span>
    )}
  </div>
);

export default InputField;
