import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div data-testid={'error-page'}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {isRouteErrorResponse(error) && (
          <div>
            <i>{error.statusText}</i> <br />
            <i>{error.error?.message}</i>
          </div>
        )}
      </p>
    </div>
  );
};

export default ErrorPage;
