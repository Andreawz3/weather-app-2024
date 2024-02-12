interface Forecast {
  main: {
    temp: number;
    feels_like: number;
  }
  sys: {
    country: string;
  }
  name: string;
  weather: [
    { main: string }
  ]
}

interface WeekForecast {
  clouds: {
    all: number
  };
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: [
    { main: string }
  ]
}

interface Props {
  event: string;
  d:  string
}

interface Data {
  d: string
}

interface Info<T> {
  data: string;
  // country: string;
  // arr: T[];
}

interface Props {
  passCity: string
}