// Backend-ready API abstraction.
//
// Every function here currently resolves mock data from src/data/*
// after a short simulated network delay. Each one maps 1:1 to a
// future REST endpoint (noted above the function). Swap the body
// for a real `fetch(...)` call and no page or component needs to
// change, since they only ever import from this file.

import {
  costSummary,
  costDrivers,
  categoryBreakdown,
  getCostTrend,
} from "../data/costs.js";
import { getServices, getServiceById } from "../data/services.js";
import { getDependencyGraph } from "../data/dependencies.js";
import { getRecommendations } from "../data/recommendations.js";

const SIMULATED_LATENCY_MS = 450;

function resolveAfterDelay(value, ms = SIMULATED_LATENCY_MS) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

// GET /api/dashboard
export async function getDashboardData(period = "30d") {
  return resolveAfterDelay({
    summary: costSummary,
    trend: getCostTrend(period),
    drivers: costDrivers,
    rootCause: {
      service: "Service A",
      headline: "Unnecessary traffic → Service A",
      description:
        "Unexpected network traffic between dependent services is contributing significantly to the current cost increase.",
      impactSeries: [62, 48, 31, 52],
    },
  });
}

// GET /api/costs
export async function getCostData(period = "30d") {
  return resolveAfterDelay({
    summary: costSummary,
    trend: getCostTrend(period),
    drivers: costDrivers,
    categories: categoryBreakdown,
  });
}

// GET /api/services
export async function getServicesData() {
  return resolveAfterDelay(getServices());
}

// GET /api/services/:id
export async function getServiceDetail(id) {
  return resolveAfterDelay(getServiceById(id));
}

// GET /api/dependencies
export async function getDependenciesData() {
  return resolveAfterDelay(getDependencyGraph());
}

// GET /api/recommendations
export async function getRecommendationsData() {
  return resolveAfterDelay(getRecommendations());
}

// GET /api/root-cause
export async function getRootCauseData() {
  return resolveAfterDelay({
    problem: "Unexpected inter-service network traffic",
    affectedService: "Service A",
    dependentService: "Service B",
    severity: "High",
    confidence: 91,
    estimatedImpact: 214000,
    detectedAt: "2026-09-24T06:12:00+05:30",
    observedBehaviour:
      "Service A began issuing a sharply higher volume of synchronous calls to Service B starting Sep 21, without a matching increase in upstream request volume from the API Gateway.",
    explanation:
      "A retry loop introduced in the last deploy to Service A is re-sending failed calls to Service B without backoff, multiplying network egress and compute load on both services.",
    suggestedAction:
      "Add exponential backoff and a circuit breaker to Service A's client for Service B, then redeploy and monitor network cost for 48 hours.",
    impactSeries: [
      { stage: "Baseline", value: 0 },
      { stage: "Deploy", value: 62 },
      { stage: "Day 2", value: 48 },
      { stage: "Day 3", value: 31 },
      { stage: "Day 4", value: 52 },
    ],
  });
}
