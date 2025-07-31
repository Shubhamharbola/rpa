const App = () => {
  const [bots, setBots] = React.useState([
    { id: 1, name: 'InvoiceBot', status: 'Scheduled', lastRun: '2025-07-31 18:30:00', nextRunSeconds: 300 },
    { id: 2, name: 'ScraperBot', status: 'Scheduled', lastRun: '2025-07-31 18:45:00', nextRunSeconds: 180 },
    { id: 3, name: 'DataSyncBot', status: 'Scheduled', lastRun: '2025-07-31 18:15:00', nextRunSeconds: 600 },
  ]);

  const [logs, setLogs] = React.useState([]);
  const [loadingBotId, setLoadingBotId] = React.useState(null);
  const [metrics, setMetrics] = React.useState({
    runs: [5, 3, 7],
    errors: [1, 0, 2],
  });

  // Update countdown timers every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBots((prevBots) =>
        prevBots.map((bot) =>
          bot.status === 'Scheduled' && bot.nextRunSeconds > 0
            ? { ...bot, nextRunSeconds: bot.nextRunSeconds - 1 }
            : bot.nextRunSeconds <= 0 && bot.status === 'Scheduled'
            ? {
                ...bot,
                status: 'Running',
                lastRun: new Date().toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: true,
                }),
                nextRunSeconds: 300,
              }
            : bot
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update metrics every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        runs: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
        errors: [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)],
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = (botId, botName) => {
    if (!botId || !botName) return;
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
                    second: 'numeric',
                    hour12: true,
                  }),
                  nextRunSeconds: 300,
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
              second: 'numeric',
              hour12: true,
            }),
            bot: botName,
            message: `Bot ${botName} started`,
          },
        ]);
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          runs: prevMetrics.runs.map((run, index) =>
            index === botId - 1 ? run + 1 : run
          ),
        }));
      } catch (error) {
        console.error('Error starting bot:', error);
      }
      setLoadingBotId(null);
    }, 2000);
  };

  const handleStop = (botId, botName) => {
    if (!botId || !botName) return;
    setLoadingBotId(botId);
    setTimeout(() => {
      try {
        setBots((prevBots) =>
          prevBots.map((bot) =>
            bot.id === botId
              ? {
                  ...bot,
                  status: 'Completed',
                  nextRunSeconds: 300,
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
              second: 'numeric',
              hour12: true,
            }),
            bot: botName,
            message: `Bot ${botName} stopped`,
          },
        ]);
      } catch (error) {
        console.error('Error stopping bot:', error);
      }
      setLoadingBotId(null);
    }, 2000);
  };

  console.log('Component availability:', {
    BotCard: !!window.BotCard,
    LogViewer: !!window.LogViewer,
    Loader: !!window.Loader,
    MetricsChart: !!window.MetricsChart,
  });

  if (!window.BotCard || !window.LogViewer || !window.Loader || !window.MetricsChart) {
    return React.createElement('div', { className: 'p-4 text-red-400' }, 'Error: Components not loaded');
  }

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-900' },
    React.createElement(
      'header',
      { className: 'bg-gray-800 p-4 shadow-md' },
      React.createElement('h1', { className: 'text-3xl font-bold text-blue-400' }, 'RPA Bot Monitoring Dashboard')
    ),
    React.createElement(
      'main',
      { className: 'container mx-auto p-4' },
      React.createElement('h2', { className: 'text-2xl font-semibold mb-4 text-gray-200' }, 'Scheduled Bots'),
      React.createElement(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8' },
        bots.map((bot) =>
          React.createElement(window.BotCard, {
            key: bot.id,
            bot: bot,
            onStart: () => handleStart(bot.id, bot.name),
            onStop: () => handleStop(bot.id, bot.name),
            isLoading: loadingBotId === bot.id,
            logs: logs.filter((log) => log.bot === bot.name),
          })
        )
      ),
      React.createElement('h2', { className: 'text-2xl font-semibold mb-4 text-gray-200' }, 'Live Metrics'),
      React.createElement(window.MetricsChart, { metrics: metrics, botNames: bots.map((bot) => bot.name) }),
      React.createElement('h2', { className: 'text-2xl font-semibold mb-4 mt-8 text-gray-200' }, 'Activity Logs'),
      React.createElement(window.LogViewer, { logs: logs })
    )
  );
};

window.App = App;