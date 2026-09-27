// Mock dependency graph. Node positions are layout hints (0-1 range,
// x/y) consumed by DependencyGraph.jsx. Replace with GET /api/dependencies
// once the graph engine (Pushpa + Manish) exposes real topology.

export const nodes = [
  {
    id: "api-gateway",
    name: "API Gateway",
    type: "Network",
    cost: 74300,
    change: 48,
    usage: 82,
    risk: "Medium",
    x: 0.5,
    y: 0.08,
  },
  {
    id: "service-a",
    name: "Service A",
    type: "Compute",
    cost: 84000,
    change: 62,
    usage: 78,
    risk: "High",
    x: 0.5,
    y: 0.38,
  },
  {
    id: "service-b",
    name: "Service B",
    type: "Compute",
    cost: 96200,
    change: 24,
    usage: 61,
    risk: "Medium",
    x: 0.24,
    y: 0.68,
  },
  {
    id: "service-c",
    name: "Service C",
    type: "Compute",
    cost: 58400,
    change: 15,
    usage: 47,
    risk: "Low",
    x: 0.76,
    y: 0.68,
  },
  {
    id: "rds",
    name: "RDS",
    type: "Database",
    cost: 124000,
    change: 18,
    usage: 64,
    risk: "Low",
    x: 0.24,
    y: 0.96,
  },
  {
    id: "s3",
    name: "S3",
    type: "Storage",
    cost: 62000,
    change: 12,
    usage: 51,
    risk: "Low",
    x: 0.76,
    y: 0.96,
  },
];

export const edges = [
  { from: "api-gateway", to: "service-a" },
  { from: "service-a", to: "service-b" },
  { from: "service-a", to: "service-c" },
  { from: "service-b", to: "rds" },
  { from: "service-c", to: "s3" },
];

function dependenciesOf(id) {
  return edges.filter((e) => e.from === id).map((e) => e.to);
}

function dependentsOf(id) {
  return edges.filter((e) => e.to === id).map((e) => e.from);
}

export function getDependencyGraph() {
  const enriched = nodes.map((n) => ({
    ...n,
    dependencies: dependenciesOf(n.id).map(
      (id) => nodes.find((x) => x.id === id)?.name ?? id
    ),
    dependents: dependentsOf(n.id).map(
      (id) => nodes.find((x) => x.id === id)?.name ?? id
    ),
  }));
  return { nodes: enriched, edges };
}
