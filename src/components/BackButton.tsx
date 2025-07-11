import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} type="button" classType="back">
      &larr; Back
    </Button>
  );
}
