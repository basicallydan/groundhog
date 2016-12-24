import daysAgo from './utils/daysAgo';

const sampleActivities = [
  {
    // 7 days ago
    id: 1,
    title: 'Water the peace lily',
    lastAction: daysAgo(7.5),
    // Hours
    frequencyHours: 8 * 24,
  },
  {
    // 9 days ago
    id: 2,
    title: 'Deep-clean the bathroom',
    lastAction: daysAgo(13),
    // Hours
    frequencyHours: 14 * 24,
  },
  {
    // 0 days ago
    id: 3,
    title: 'Shave',
    lastAction: daysAgo(0),
    // Hours
    frequencyHours: 3 * 24,
  },
  {
    // 11 days ago
    id: 4,
    title: 'Clean shoes',
    lastAction: daysAgo(11),
    // Hours
    frequencyHours: 14 * 24,
  },
  {
    // 0.5 days ago
    id: 5,
    title: 'Call mum',
    lastAction: daysAgo(0.5),
    // Hours
    frequencyHours: 7 * 24,
  },
];

export default sampleActivities;
