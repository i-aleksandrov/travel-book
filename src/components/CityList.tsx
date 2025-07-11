import { useCities } from '../hooks/use-cities';
import CityItem from './CityItem';
import classes from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={classes.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
