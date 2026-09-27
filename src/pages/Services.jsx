import { useEffect, useState } from "react";
import { getServicesData } from "../lib/api.js";
import ServiceTable from "../components/ServiceTable.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { TableSkeleton } from "../components/LoadingState.jsx";

export default function Services() {
  const [state, setState] = useState({ status: "loading", data: null });

  function load() {
    setState({ status: "loading", data: null });
    getServicesData()
      .then((data) => setState({ status: "ready", data }))
      .catch(() => setState({ status: "error", data: null }));
  }

  useEffect(load, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Services</h1>
          <div className="subtitle">Every cloud service CloudShadow is tracking, ranked by spend.</div>
        </div>
      </div>

      {state.status === "loading" && <TableSkeleton rows={7} />}
      {state.status === "error" && <ErrorState onRetry={load} />}
      {state.status === "ready" && <ServiceTable services={state.data} />}
    </div>
  );
}
