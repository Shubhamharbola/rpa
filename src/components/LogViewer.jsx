const LogViewer = ({ logs }) => {
  return React.createElement(
    'div',
    { className: 'bg-white p-4 rounded-lg shadow-md' },
    React.createElement(
      'table',
      { className: 'w-full table-auto' },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          { className: 'bg-gray-200' },
          React.createElement('th', { className: 'px-4 py-2 text-left' }, 'Timestamp'),
          React.createElement('th', { className: 'px-4 py-2 text-left' }, 'Bot'),
          React.createElement('th', { className: 'px-4 py-2 text-left' }, 'Message')
        )
      ),
      React.createElement(
        'tbody',
        null,
        logs.map((log, index) =>
          React.createElement(
            'tr',
            { key: index, className: 'border-b' },
            React.createElement('td', { className: 'px-4 py-2' }, log.timestamp),
            React.createElement('td', { className: 'px-4 py-2' }, log.bot),
            React.createElement('td', { className: 'px-4 py-2' }, log.message)
          )
        )
      )
    )
  );
};

window.LogViewer = LogViewer;