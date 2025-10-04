import { Link } from 'react-router-dom';

export const Button = ({ 
  children, 
  onClick, 
  to, 
  variant = 'primary',
  size = 'medium',
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'text-white hover:opacity-90 active:opacity-75 focus:ring-blue-500',
    secondary: 'bg-white border-2 hover:opacity-10 active:opacity-20 focus:ring-blue-500',
    outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const customStyles = variant === 'primary' ? { backgroundColor: '#296CAC' } : 
                      variant === 'secondary' ? { color: '#296CAC', borderColor: '#296CAC' } : {};

  const baseStyles = `
    inline-block font-semibold rounded-lg transition-all duration-200 
    shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50
    ${variants[variant]} ${sizes[size]}
  `.trim();

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${className} text-center`}
        style={customStyles}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      style={customStyles}
      {...props}
    >
      {children}
    </button>
  );
};