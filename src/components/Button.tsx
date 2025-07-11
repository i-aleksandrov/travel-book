import classes from './Button.module.css';

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  type?: 'submit' | 'button' | 'reset';
  classType: 'primary' | 'back' | 'position';
}

export default function Button({
  children,
  onClick,
  type,
  classType,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${classes.btn} ${classes[classType]}`}
    >
      {children}
    </button>
  );
}
