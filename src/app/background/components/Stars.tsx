const Stars = () => {
  const starCount = 20; // Number of stars to render
  return (
    <div className="absolute top-0 left-0 w-full h-40 pointer-events-none">
      {Array.from({ length: starCount }).map((_, index) => (
        <img
          key={index}
          src="/stars.png" // Your single star image
          className="absolute animate-twinkle"
          style={{
            top: `${Math.random() * 40}px`, // Random Y position
            left: `${Math.random() * 100}%`, // Random X position
            width: `${Math.random() * 10 + 5}px`, // Random size
          }}
          alt="star"
        />
      ))}
    </div>
  );
};

export default Stars;
