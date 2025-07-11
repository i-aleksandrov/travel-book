// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import Button from './Button';
import classes from './Form.module.css';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import { useUrlPosition } from '../hooks/use-url-position';
import Message from './Message';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../hooks/use-cities';
import type { CityModel } from '../models/city.model';

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading: isLoadingCitiesContext } = useCities();

  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [notes, setNotes] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError('');
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryName) {
          throw new Error("That doesn't seem to be a valid location");
        }

        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.message);
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    if (lat && lng) {
      fetchCityData();
    }
  }, [lat, lng]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newCity: CityModel = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: Number(lat), lng: Number(lng) },
      id: uuidv4(),
    };

    createCity(newCity).then(() => {
      navigate('../cities');
    });
  }

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form
      className={`${classes.form} ${
        isLoadingCitiesContext ? classes.loading : ''
      }`}
      onSubmit={handleSubmit}
    >
      <div className={classes.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={classes.flag}>{emoji}</span>
      </div>

      <div className={classes.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={new Date(date)}
          onChange={(e) => setDate(e!.toLocaleDateString())}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={classes.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={classes.buttons}>
        <Button onClick={() => {}} classType="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
