const SuccessMessage = ({ message }) => (
  <>
    <div className="rounded-md bg-green-50 p-4 mt-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      </div>
    </div>
  </>
);

export default SuccessMessage;
