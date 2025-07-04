import Cloud from './Cloud';

const Clouds = () =>  {
  const cloudData = [
    { delay: 3, xPosition: 40, yPosition: 10, scale: 1.2 },
    { delay: 3.2, xPosition: 47, yPosition: 7, scale: 0.9 },
    { delay: 3.4, xPosition: 57, yPosition: 15, scale: 1.1 },
    { delay: 3.6, xPosition: 67, yPosition: 20, scale: 1.5 },
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
