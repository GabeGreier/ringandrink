export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div 
        className="animate-spin rounded-full h-16 w-16 border-b-2 mb-4"
        style={{ borderBottomColor: '#296CAC' }}
      ></div>
      <p className="text-gray-600 text-lg font-medium">{message}</p>
    </div>
  );
}