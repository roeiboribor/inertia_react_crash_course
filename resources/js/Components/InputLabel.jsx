export default function InputLabel({
    value,
    required = false,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block font-medium text-sm text-gray-700 ` + className}
        >
            {value ? value : children}{" "}
            {required ? <span className="text-red-600">*</span> : null}
        </label>
    );
}
