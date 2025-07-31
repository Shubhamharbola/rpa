const LogViewer = ({ logs }) => {
  return React.createElement(
    'div',
    { className: 'bg-gray-800 p-4 rounded-lg shadow-md' },
    React.createElement(
      'table',
      { className: 'w-full table-auto text-gray-200' },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          { className: 'bg-gray-700' },
          React.createElement('th', { className: 'px-4 py-2 text-left' }, 'Timestamp'),
          React.createElement('th', { className: 'px-4 py-2 text-left' }, 'Bot'),
          React.createElement('th', { className: 'px-4 py-2 text-left' }, 'Message')
        )
      ),
      React.createElement(
        'tbody',
        null,
        (logs || []).map((log, index) =>
          React.createElement(
            'tr',
            { key: index, className: 'border-b border-gray-700 transition-colors duration-200 hover:bg-gray-600' },
            React.createElement('td', { className: 'px-4 py-2' }, log.timestamp || 'N/A'),
            React.createElement('td', { className: 'px-4 py-2' }, log.bot || 'Unknown'),
            React.createElement('td', { className: 'px-4 py-2' }, log.message || 'No message')
          )
        )
      )
    )
  );
};

window.LogViewer = LogViewer;