export default function Button({
    className = "",
    disabled,
    type = "submit",
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`btn ` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
