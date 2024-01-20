export const predefinedDateRanges = [
    {
      label: 'Today',
      value: [new Date(), new Date()]
    },
    {
      label: 'Yesterday',
      value: [
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1), 
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
      ]
    },
    {
      label: 'This week',
      value: [
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay()),
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay()))
      ]
    },
    {
      label: 'Last 7 days',
      value: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 6), new Date()]
    },
    {
      label: 'Last 30 days',
      value: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 29), new Date()]
    },
    {
      label: 'This month',
      value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()]
    },
    {
      label: 'Last month',
      value: [
        new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), 
        new Date(new Date().getFullYear(), new Date().getMonth(), 0)
      ]
    },
    {
      label: 'This year',
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()]
    },
    {
      label: 'Last year',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)]
    },
    {
      label: 'All time',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()]
    }
  ];