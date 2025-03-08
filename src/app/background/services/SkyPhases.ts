
export const skyPhases = {
  day: { colors: "from-blue-400 to-blue-700", showClouds: true, showStars: false, name: "Day" },
  sunset: { colors: "from-orange-500 via-pink-500 to-purple-700", showClouds: false, showStars: false, name: "Sunset" },
  cloudy: { colors: "from-gray-300 to-gray-500", showClouds: true, showStars: false, name: "Cloudy" },
  night: { colors: "from-black to-gray-900", showClouds: false, showStars: true, name: "Night" },
  default: { colors: "from-white to-blue-600", showClouds: false, showStars: false, name: "Default" }
};

export const getPhase = () => {
  const hour = new Date().getHours();

  console.log("Hour of the day is: " + hour);
  if (hour >= 6 && hour < 18) return skyPhases.day; // 6 AM - 6 PM
  if (hour >= 18 && hour < 20) return skyPhases.night; // 6 PM - 8 PM
  return skyPhases.night; // 8 PM - 6 AM
};


export const setSkyPhaseByWeather = async (
  location: { lat: number, lon: number },
  setWeather: (weather: { colors: string, showClouds: boolean, showStars: boolean, name: string}) => void,
) => {
    const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}`
      )
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();

      const sunsetTime = data.sys.sunset;
      const currentTime = Math.floor(Date.now() / 1000);  // Convert to Unix timestamp
      if (currentTime >= sunsetTime) {
        setWeather(skyPhases.sunset); // 🌅 Sunset Mode
      } else if (data.clouds.all > 50) {
        console.log(`☁️ Cloudy weather detected: ${skyPhases.cloudy}`);
        setWeather(skyPhases.cloudy);
      } else {
        console.log("🌙 Default night mode");
        setWeather(getPhase());
      }
    } catch (err) {
      if (err instanceof Error) console.error("Error fetching weather data:", err);
    }
}
