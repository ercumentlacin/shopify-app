import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function ErrorPage() {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate('/'), []);
  return (
    <div className="error__page">
      <Icon />
      <p className="error__page__title">Sorry, something went wrong</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={goHome}
      >
        Back Home
      </button>
    </div>
  );
}
