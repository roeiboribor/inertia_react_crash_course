export default function Button({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button {...props} className={`btn ` + className} disabled={disabled}>
            {children}
        </button>
    );
}
