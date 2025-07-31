const BotCard = ({ bot, onStart, onStop, isLoading, logs }) => {
  const [showLogs, setShowLogs] = React.useState(false);

  const statusColors = {
    Scheduled: 'bg-blue-600 text-blue-100',
    Running: 'bg-green-600 text-green-100',
    Completed: 'bg-gray-600 text-gray-100',
  };

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!bot) {
    return React.createElement('div', { className: 'p-4 text-red-400' }, 'Error: Bot data missing');
  }

  return React.createElement(
    'div',
    { className: 'bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg' },
    React.createElement('h3', { className: 'text-lg font-semibold text-gray-200' }, bot.name || 'Unknown Bot'),
    React.createElement(
      'p',
      {
        className: `inline-block px-2 py-1 rounded ${statusColors[bot.status] || 'bg-gray-600 text-gray-100'} transition-colors duration-300`,
      },
      bot.status || 'Unknown'
    ),
    React.createElement(
      'p',
      { className: 'text-gray-400 mt-2' },
      `Last Run: ${bot.lastRun || 'N/A'}`
    ),
    React.createElement(
      'p',
      { className: 'text-gray-400 mt-1 animate-pulse' },
      `Next Run: ${bot.status === 'Scheduled' ? formatTimer(bot.nextRunSeconds) : 'N/A'}`
    ),
    React.createElement(
      'div',
      { className: 'mt-4 flex space-x-2' },
      isLoading
        ? React.createElement(window.Loader || 'div', null, 'Loading...')
        : [
            React.createElement(
              'button',
              {
                onClick: onStart,
                className: `bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 ${
                  bot.status === 'Running' ? 'opacity-50 cursor-not-allowed' : ''
                }`,
                disabled: bot.status === 'Running',
              },
              'Start'
            ),
            React.createElement(
              'button',
              {
                onClick: onStop,
                className: `bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200 ${
                  bot.status !== 'Running' ? 'opacity-50 cursor-not-allowed' : ''
                }`,
                disabled: bot.status !== 'Running',
              },
              'Stop'
            ),
          ]
    ),
    React.createElement(
      'div',
      { className: 'mt-2' },
      React.createElement(
        'button',
        {
          onClick: () => setShowLogs(!showLogs),
          className: 'text-blue-400 hover:text-blue-300 transition-colors duration-200',
        },
        showLogs ? 'Hide Logs' : 'Show Logs'
      ),
      showLogs &&
        React.createElement(
          'div',
          { className: 'mt-2 bg-gray-700 p-2 rounded max-h-40 overflow-y-auto transition-all duration-300' },
          logs.length > 0
            ? logs.slice(0, 3).map((log, index) =>
                React.createElement(
                  'p',
                  { key: index, className: 'text-sm text-gray-300' },
                  `${log.timestamp}: ${log.message}`
                )
              )
            : React.createElement('p', { className: 'text-sm text-gray-400' }, 'No logs available')
        )
    )
  );
};

window.BotCard = BotCard;