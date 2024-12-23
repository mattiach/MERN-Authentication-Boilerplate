const SpinnerFullScreen = () => {

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-5 min-w-screen`}
    >
      <div className="flex space-x-2 animate-pulse">
        <div
          className={`w-4 h-4 rounded-full bg-gray-700`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full bg-gray-600`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full bg-gray-700`}
        ></div>
      </div>
    </div>
  );
};

export default SpinnerFullScreen;