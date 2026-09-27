// Mock daily cost data (INR) for the trailing 30 days.
// Replace with a real API response shaped the same way once
// GET /api/costs is available.

function buildTrend() {
  const points = [
    { day: 1, cost: 17250 },
    { day: 3, cost: 17800 },
    { day: 5, cost: 18900 },
    { day: 7, cost: 19400 },
    { day: 9, cost: 21100 },
    { day: 11, cost: 22600 },
    { day: 13, cost: 24300 },
    { day: 15, cost: 27100 },
    { day: 17, cost: 29800 },
    { day: 19, cost: 32400 },
    { day: 21, cost: 35900 },
    { day: 23, cost: 39200 },
    { day: 25, cost: 43100 },
    { day: 27, cost: 47600 },
    { day: 29, cost: 50200 },
    { day: 30, cost: 51840 },
  ];
  return points.map((p) => ({
    ...p,
    label: `Day ${p.day}`,
  }));
}

export const costTrend30d = buildTrend();

export const costTrend7d = costTrend30d.slice(-7);
export const costTrend90d = [
  { day: -60, label: "Day -60", cost: 9800 },
  { day: -45, label: "Day -45", cost: 11200 },
  { day: -30, label: "Day -30", cost: 13600 },
  ...costTrend30d,
];

export const costSummary = {
  currentTotal: 742300, // ₹7.42L
  previousTotal: 536200,
  percentIncrease: 38.4,
  dailyAverage: 24743,
  monthlyProjection: 812400,
  performanceScore: 82,
  reliabilityScore: 94,
};

export const costDrivers = [
  { id: "network", name: "Network", cost: 214000, percent: 29, change: 52 },
  { id: "compute", name: "Compute", cost: 186000, percent: 25, change: 31 },
  { id: "database", name: "Database", cost: 142000, percent: 19, change: 18 },
  { id: "storage", name: "Storage", cost: 82000, percent: 11, change: 12 },
  { id: "other", name: "Other", cost: 118300, percent: 16, change: 6 },
];

export const categoryBreakdown = [
  { category: "Compute", cost: 186000, change: 31 },
  { category: "Network", cost: 214000, change: 52 },
  { category: "Database", cost: 142000, change: 18 },
  { category: "Storage", cost: 82000, change: 12 },
  { category: "Monitoring", cost: 41300, change: 9 },
  { category: "Other", cost: 77000, change: 4 },
];

export function getCostTrend(period) {
  if (period === "7d") return costTrend7d;
  if (period === "90d") return costTrend90d;
  return costTrend30d;
}
