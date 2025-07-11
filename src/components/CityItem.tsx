import { Link } from 'react-router-dom';
import type { CityModel } from '../models/city.model';
import { formatDate } from '../util';
import classes from './CityItem.module.css';
import { useCities } from '../hooks/use-cities';

interface CityItemProps {
  city: CityModel;
}

const CityItem = ({ city }: CityItemProps) => {
  const { currentCity, deleteCity } = useCities();

  function handleDelete(event: React.MouseEvent) {
    event.preventDefault();
    deleteCity(city.id!);
  }

  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={`${classes.cityItem} ${
          currentCity.id === city.id ? classes['cityItem--active'] : ''
        }`}
      >
        <span className={classes.emoji}>{city.emoji}</span>
        <h3 className={classes.cityName}>{city.cityName}</h3>
        <time className={classes.date}>{formatDate(city.date)}</time>
        <button className={classes.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
