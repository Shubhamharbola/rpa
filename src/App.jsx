const App = () => {
  const [bots, setBots] = React.useState([
    { id: 1, name: 'Invoice Bot', status: 'Stopped', lastRun: '2025-07-30 09:30 PM' },
    { id: 2, name: 'Data Entry Bot', status: 'Stopped', lastRun: '2025-07-30 08:45 PM' },
    { id: 3, name: 'Report Bot', status: 'Stopped', lastRun: '2025-07-30 07:15 PM' },
  ]);

  const [logs, setLogs] = React.useState([]);
  const [loadingBotId, setLoadingBotId] = React.useState(null);

  const handleStart = (botId, botName) => {
    if (!botId || !botName) return; // Prevent invalid updates
    setLoadingBotId(botId);
    setTimeout(() => {
      try {
        setBots((prevBots) =>
          prevBots.map((bot) =>
            bot.id === botId
              ? {
                  ...bot,
                  status: 'Running',
                  lastRun: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  }),
                }
              : bot
          )
        );
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            timestamp: new Date().toLocaleString('en-US', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }),
            bot: botName,
            message: `Bot ${botName} started`,
          },
        ]);
      } catch (error) {
        console.error('Error updating state:', error);
      }
      setLoadingBotId(null);
    }, 2000);
  };

  if (!window.BotCard || !window.LogViewer || !window.Loader) {
    return React.createElement('div', { className: 'p-4 text-red-500' }, 'Error: Components not loaded');
  }

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-100' },
    React.createElement(
      'header',
      { className: 'bg-blue-600 text-white p-4 shadow-md' },
      React.createElement('h1', { className: 'text-3xl font-bold' }, 'RPA Bot Monitoring System')
    ),
    React.createElement(
      'main',
      { className: 'container mx-auto p-4' },
      React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Bot Status'),
      React.createElement(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8' },
        bots.map((bot) =>
          React.createElement(window.BotCard, {
            key: bot.id,
            bot: bot,
            onStart: () => handleStart(bot.id, bot.name),
            isLoading: loadingBotId === bot.id,
          })
        )
      ),
      React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Activity Logs'),
      React.createElement(window.LogViewer, { logs: logs })
    )
  );
};

window.App = App;