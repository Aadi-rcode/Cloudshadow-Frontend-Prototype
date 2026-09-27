import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDependenciesData } from "../lib/api.js";
import DependencyGraph from "../components/DependencyGraph.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { ChartSkeleton } from "../components/LoadingState.jsx";

export default function Dependencies() {
  const [state, setState] = useState({ status: "loading", data: null });
  const [searchParams] = useSearchParams();
  const initialNode = searchParams.get("node");

  function load() {
    setState({ status: "loading", data: null });
    getDependenciesData()
      .then((data) => setState({ status: "ready", data }))
      .catch(() => setState({ status: "error", data: null }));
  }

  useEffect(load, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dependencies</h1>
          <div className="subtitle">
            How your services connect — click a node to inspect it.
          </div>
        </div>
      </div>

      {state.status === "loading" && <ChartSkeleton height={420} />}
      {state.status === "error" && <ErrorState onRetry={load} />}
      {state.status === "ready" && (
        <DependencyGraph graph={state.data} initialSelected={initialNode} />
      )}
    </div>
  );
}
