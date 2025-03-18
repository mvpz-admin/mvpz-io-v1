import { useRouter } from 'next/router';

export default function PaymentFailure() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen  flex items-center justify-center backdrop-brightness-50" id="reavelpage">
      <div className="text-center p-8 backdrop-blur-md bg-black bg-opacity-20 rounded-lg shadow-xl max-w-md w-full">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-300 mb-8">
          Sorry, your payment could not be processed. Please try again later.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
