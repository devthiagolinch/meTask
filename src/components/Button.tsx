import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';

// Esse buttonhtmlatributes possibilita que eu pase para esse botao todos os
// atributos normais que um botao de html receberia.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  )
}