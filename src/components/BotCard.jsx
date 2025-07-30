const BotCard = ({ bot, onStart, isLoading }) => {
  const statusColors = {
    Running: 'bg-green-100 text-green-800',
    Stopped: 'bg-red-100 text-red-800',
    Error: 'bg-yellow-100 text-yellow-800',
  };

  if (!bot) {
    return React.createElement('div', { className: 'p-4 text-red-500' }, 'Error: Bot data missing');
  }

  return React.createElement(
    'div',
    { className: 'bg-white p-4 rounded-lg shadow-md' },
    React.createElement('h3', { className: 'text-lg font-semibold' }, bot.name || 'Unknown Bot'),
    React.createElement(
      'p',
      { className: `inline-block px-2 py-1 rounded ${statusColors[bot.status] || 'bg-gray-100 text-gray-800'}` },
      bot.status || 'Unknown'
    ),
    React.createElement('p', { className: 'text-gray-600 mt-2' }, `Last Run: ${bot.lastRun || 'N/A'}`),
    React.createElement(
      'div',
      { className: 'mt-4' },
      isLoading
        ? React.createElement(window.Loader || 'div', null, 'Loading...')
        : React.createElement(
            'button',
            {
              onClick: onStart,
              className: `bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                bot.status === 'Running' ? 'opacity-50 cursor-not-allowed' : ''
              }`,
              disabled: bot.status === 'Running',
            },
            'Start Bot'
          )
    )
  );
};

window.BotCard = BotCard;