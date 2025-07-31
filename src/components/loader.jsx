const Loader = () => {
  return React.createElement(
    'div',
    { className: 'flex items-center justify-center' },
    React.createElement(
      'div',
      {
        className: 'w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin',
      },
      null
    )
  );
};

window.Loader = Loader;