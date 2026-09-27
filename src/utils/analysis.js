// Small formatting / analysis helpers shared across pages.

export function formatINR(value) {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  return `₹${value}`;
}

export function formatINRFull(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value, opts = {}) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(opts.decimals ?? 1)}%`;
}

export function changeTone(change) {
  if (change > 25) return "danger";
  if (change > 10) return "warning";
  return "positive";
}

export function statusTone(status) {
  const map = {
    High: "danger",
    Warning: "warning",
    Normal: "positive",
    Low: "positive",
    Medium: "warning",
  };
  return map[status] ?? "neutral";
}
