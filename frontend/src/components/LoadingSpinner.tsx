interface LoadingSpinnerProps {
    text?: string;
  }
  
  export default function LoadingSpinner({ text = 'Loading...' }: LoadingSpinnerProps) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-xl text-gray-600">{text}</p>
      </div>
    );
  }