import React from "react";

const Button = ({
  children,
  variant = "primary", // primary, secondary, outline, ghost, danger
  size = "md", // sm, md, lg
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "bg-[#FF5A36] text-white hover:bg-[#E94B2F] shadow-xs hover:shadow-md",
    secondary:
      "bg-[#FFF8F1] text-[#FF5A36] border border-[#FF5A36]/30 hover:bg-[#FF5A36] hover:text-white",
    outline:
      "bg-white text-[#172B4D] border border-[#E8E5E1] hover:border-[#FF5A36] hover:text-[#FF5A36]",
    ghost:
      "bg-transparent text-[#667085] hover:bg-[#FFF8F1] hover:text-[#FF5A36]",
    danger:
      "bg-[#E94B2F] text-white hover:bg-red-700 shadow-xs",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
