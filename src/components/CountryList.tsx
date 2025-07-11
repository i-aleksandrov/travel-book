import classes from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import { useCities } from '../hooks/use-cities';

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const set = new Set();

  const countries = cities
    .filter((c) => {
      if (set.has(c.country)) {
        return false;
      }
      set.add(c.country);
      return true;
    })
    .map((c) => {
      return {
        country: c.country,
        emoji: c.emoji,
      };
    });
  return (
    <ul className={classes.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
