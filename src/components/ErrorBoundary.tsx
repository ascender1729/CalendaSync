import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Something went wrong</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded-lg mb-4 overflow-auto">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}