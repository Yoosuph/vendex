import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-lg text-center">
          <span className="material-symbols-outlined text-6xl text-error mb-md">error</span>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">Something went wrong</h2>
          <p className="text-body-sm text-on-surface-variant mb-lg max-w-md">
            An unexpected error occurred. Please try again or refresh the page.
          </p>
          <button
            onClick={this.handleRetry}
            className="px-6 py-2 bg-primary text-white rounded-lg font-label-md hover:bg-primary-container transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
