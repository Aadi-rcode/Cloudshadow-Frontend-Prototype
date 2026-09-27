// Mock service inventory. Replace with GET /api/services later —
// keep the same shape so ServiceTable.jsx needs no changes.

export const services = [
  {
    id: "service-a",
    name: "Service A",
    type: "Compute",
    cost: 184500,
    change: 62,
    usage: 78,
    status: "High",
  },
  {
    id: "ec2",
    name: "EC2 — API Fleet",
    type: "Compute",
    cost: 185000,
    change: 42,
    usage: 78,
    status: "High",
  },
  {
    id: "service-b",
    name: "Service B",
    type: "Compute",
    cost: 96200,
    change: 24,
    usage: 61,
    status: "Normal",
  },
  {
    id: "service-c",
    name: "Service C",
    type: "Compute",
    cost: 58400,
    change: 15,
    usage: 47,
    status: "Normal",
  },
  {
    id: "rds",
    name: "RDS — Primary",
    type: "Database",
    cost: 124000,
    change: 18,
    usage: 64,
    status: "Normal",
  },
  {
    id: "s3",
    name: "S3 — Object Storage",
    type: "Storage",
    cost: 62000,
    change: 12,
    usage: 51,
    status: "Normal",
  },
  {
    id: "lambda",
    name: "Lambda — Event Workers",
    type: "Compute",
    cost: 41000,
    change: 27,
    usage: 72,
    status: "Warning",
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    type: "Network",
    cost: 74300,
    change: 48,
    usage: 82,
    status: "Warning",
  },
  {
    id: "cloudwatch",
    name: "CloudWatch — Observability",
    type: "Monitoring",
    cost: 21400,
    change: 9,
    usage: 33,
    status: "Normal",
  },
];

export function getServices() {
  return services;
}

export function getServiceById(id) {
  return services.find((s) => s.id === id) ?? null;
}
