interface ComponentProps {
  messages: string[];
}

const Alert: React.FC<ComponentProps> = ({ messages }) => {

  let arrMsg: JSX.Element[] = [];

  messages.forEach((value: string, index: number) => {
    arrMsg.push(<li key={index}>{value}</li>);
  });


  return (
    <div className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:text-red-500 mb-5" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
        </div>
        <div className="ms-4">
          <h3 className="text-sm font-semibold">
            A problem has been occurred while submitting your data.
          </h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-400">
            <ul className="list-disc space-y-1 ps-5">
              {arrMsg}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Alert;

/*
  <li>This username is already in use</li>
  <li>Email field can't be empty</li>
  <li>Please enter a valid phone number</li>
*/