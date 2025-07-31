console.log('App.jsx loaded');
const App = () => {
  console.log('App.jsx rendering');
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

  // Fake queue data
  const queueTasks = [
    { name: 'Process Invoices', priority: 'High', estimatedTime: '10 mins' },
    { name: 'Update Database', priority: 'Medium', estimatedTime: '15 mins' },
    { name: 'Generate Report', priority: 'Low', estimatedTime: '20 mins' },
  ];

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

  // Update metrics every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        runs: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
        errors: [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)],
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = (botId, botName) => {
    console.log('Start clicked:', botId, botName);
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
    console.log('Stop clicked:', botId, botName);
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
      React.createElement('h2', { className: 'text-2xl font-semibold mb-4 text-gray-200' }, 'Queue Management'),
      React.createElement(
        'div',
        { className: 'bg-gray-800 p-4 rounded-lg shadow-md mb-8' },
        React.createElement('p', { className: 'text-lg text-gray-200 mb-2' }, '3 tasks remaining in queue'),
        React.createElement(
          'ul',
          { className: 'space-y-2' },
          queueTasks.map((task, index) =>
            React.createElement(
              'li',
              {
                key: index,
                className: 'bg-gray-700 p-2 rounded flex justify-between items-center transition-all duration-300 hover:shadow-lg',
              },
              React.createElement('span', { className: 'text-gray-200' }, task.name),
              React.createElement(
                'div',
                { className: 'flex space-x-4' },
                React.createElement(
                  'span',
                  { className: `text-sm ${task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-yellow-400' : 'text-green-400'}` },
                  `Priority: ${task.priority}`
                ),
                React.createElement('span', { className: 'text-sm text-gray-400' }, `Est. Time: ${task.estimatedTime}`)
              )
            )
          )
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
console.log('App.jsx assigned to window.App');