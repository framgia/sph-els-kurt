const ValidationErrors = ({ errors }) => (
  <>
    {errors.length > 0 && (
      <div>
        <ul className="mt-3 text-sm text-red-600">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default ValidationErrors;
