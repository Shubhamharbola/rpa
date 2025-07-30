const Header = () => {
  return React.createElement(
    'header',
    { className: 'bg-blue-600 text-white p-4 shadow-md' },
    React.createElement('h1', { className: 'text-3xl font-bold' }, 'RPA Bot Monitoring System')
  );
};

window.Header = Header;