// Mock recommendation set. Replace with GET /api/recommendations —
// the engine team (Pushpa + Manish) will rank and generate these.

export const recommendations = [
  {
    id: "rec-1",
    title: "Reduce unnecessary network traffic",
    explanation:
      "Service A is issuing far more inter-service calls to Service B than its traffic pattern requires. Batching and caching these calls would cut network cost directly.",
    savings: 42000,
    impact: "High",
    priority: 1,
    action: "Review inter-service communication",
    relatedService: "service-a",
  },
  {
    id: "rec-2",
    title: "Optimize idle compute instances",
    explanation:
      "Several EC2 instances behind the API fleet sit near 20% utilization outside business hours. Scheduling scale-down would recover meaningful spend.",
    savings: 31000,
    impact: "Medium",
    priority: 2,
    action: "Schedule unused resources",
    relatedService: "ec2",
  },
  {
    id: "rec-3",
    title: "Right-size database capacity",
    explanation:
      "RDS primary is provisioned above its sustained load. Downsizing the instance class and enabling storage autoscaling would lower baseline cost.",
    savings: 18000,
    impact: "Medium",
    priority: 3,
    action: "Right-size instance class",
    relatedService: "rds",
  },
  {
    id: "rec-4",
    title: "Move cold objects to lower-cost storage",
    explanation:
      "A large share of S3 objects haven't been accessed in 60+ days. Lifecycle rules into infrequent-access storage would reduce storage spend with no latency impact.",
    savings: 9400,
    impact: "Low",
    priority: 4,
    action: "Add lifecycle policy",
    relatedService: "s3",
  },
  {
    id: "rec-5",
    title: "Consolidate Lambda cold starts",
    explanation:
      "Event workers show frequent cold starts driving up invocation cost. Provisioned concurrency for the busiest functions would smooth spend and latency.",
    savings: 6200,
    impact: "Low",
    priority: 5,
    action: "Enable provisioned concurrency",
    relatedService: "lambda",
  },
];

export function getRecommendations() {
  return recommendations;
}
