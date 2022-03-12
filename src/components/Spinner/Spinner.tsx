import spinnerSvg from 'assets/svg/spinner.svg';

export default function Spinner() {
  return (
    <div className="spinner">
      <img src={spinnerSvg} alt="spinner" />
    </div>
  );
}
