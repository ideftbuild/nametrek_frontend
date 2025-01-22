import React from 'react';

const DropTextAnimation: React.FC<{text: string, className: string}> = ({ text, className } ) => {
  return (
    <p className={className}>
      {text.split('').map((word, index) => (
        <span
          key={index}
          className={"inline-block animate-drop"}
          style={{
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
          }}
        >
        &nbsp;{word}
        </span>
      ))}

    </p>
  )
}

export default DropTextAnimation;
