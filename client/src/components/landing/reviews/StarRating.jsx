import { useState } from 'react';

const StarRating = ({ 
  maxRating = 5, 
  defaultRating = 0, 
  onRatingChange,
  size = 'medium',
  disabled = false 
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);

  const styles = {
    container: {
      display: 'inline-flex',
      flexDirection: 'row-reverse',
      gap: '4px',
      direction: 'rtl'
    },
    star: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: size === 'small' ? '20px' : size === 'large' ? '36px' : '28px',
      color: '#ddd',
      transition: 'color 0.2s ease, transform 0.2s ease',
      opacity: disabled ? 0.6 : 1,
    },
    starActive: {
      color: '#ffd700',
    },
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' }
    }
  };

  const handleClick = (value) => {
    if (!disabled) {
      setRating(value);
      if (onRatingChange) {
        onRatingChange(value);
      }
    }
  };

  return (
    <div style={styles.container}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isActive = (hover || rating) >= starValue;
        
        return (
          <button
            type="button"
            key={starValue}
            style={{
              ...styles.star,
              ...(isActive && styles.starActive),
              ':hover': {
                transform: !disabled && 'scale(1.1)'
              }
            }}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !disabled && setHover(starValue)}
            onMouseLeave={() => !disabled && setHover(0)}
            disabled={disabled}
          >
            ★
          </button>
        );
      })}
      <style>
        {`
          button:hover {
            transform: ${!disabled && 'scale(1.1)'};
          }
          button:active {
            transform: ${!disabled && 'scale(0.95)'};
          }
        `}
      </style>
    </div>
  );
};

export default StarRating;