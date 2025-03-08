import Cloud from './Cloud';

const Clouds = () =>  {
  const cloudData = [
    { delay: 0, xPosition: 10, yPosition: 5, scale: 1 },
    { delay: 3, xPosition: 30, yPosition: 10, scale: 1.2 },
    { delay: 6, xPosition: 60, yPosition: 7, scale: 0.9 },
    { delay: 9, xPosition: 80, yPosition: 15, scale: 1.1 },
    { delay: 12, xPosition: 100, yPosition: 20, scale: 1.5 },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-[20vh] overflow-hidden">
      {cloudData.map((cloud, index) => (
        <Cloud key={index} {...cloud} />
      ))}
    </div>
  );
}

export default Clouds;
