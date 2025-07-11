import classes from './City.module.css';
import { formatDate } from '../util';
import { useParams } from 'react-router-dom';
import { useCities } from '../hooks/use-cities';
import { useEffect } from 'react';
import type { CityModel } from '../models/city.model';
import Spinner from './Spinner';
import BackButton from './BackButton';

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  const { cityName, emoji, date, notes } = currentCity as CityModel;

  useEffect(() => {
    getCity(id!);
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.city}>
      <div className={classes.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={classes.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={classes.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={classes.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
