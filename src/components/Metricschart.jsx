const MetricsChart = ({ metrics, botNames }) => {
  const canvasId = 'metricsChart';

  React.useEffect(() => {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: botNames || ['InvoiceBot', 'ScraperBot', 'DataSyncBot'],
        datasets: [
          {
            label: 'Runs Today',
            data: metrics?.runs || [0, 0, 0],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
          {
            label: 'Errors Today',
            data: metrics?.errors || [0, 0, 0],
            backgroundColor: 'rgba(239, 68, 68, 0.6)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, color: '#d1d5db' },
            grid: { color: '#374151' },
          },
          x: {
            ticks: { color: '#d1d5db' },
            grid: { color: '#374151' },
          },
        },
        animation: {
          duration: 1000,
        },
        plugins: {
          legend: { labels: { color: '#d1d5db' } },
        },
      },
    });

    return () => chart.destroy();
  }, [metrics, botNames]);

  return React.createElement(
    'div',
    { className: 'bg-gray-800 p-4 rounded-lg shadow-md' },
    React.createElement('canvas', { id: canvasId })
  );
};

window.MetricsChart = MetricsChart;