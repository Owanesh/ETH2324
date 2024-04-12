import React from "react";

const Button = ({ children, onClick, className='', variant='' }) => {
  let buttonClasses = "font-bold py-2 px-4 rounded ";

  switch (variant) {
    case "primary":
      buttonClasses += "text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 ";
      break;
    case "secondary":
      buttonClasses += "text-white bg-gray-500 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 ";
      break;
    case "success":
      buttonClasses += "text-white bg-green-500 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-900 ";
      break;
    case "danger":
      buttonClasses += "text-white bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 ";
      break;
    default:
      buttonClasses += "text-white bg-gray-500 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 ";
      break;
  }

  buttonClasses += className || "";

  // Sanitize the children prop to prevent XSS
  const safeChildren = typeof children === "string" ? children : "";

  return (
    <button onClick={onClick} className={buttonClasses.trim()}>
      {safeChildren}
    </button>
  );
};

export default Button;
