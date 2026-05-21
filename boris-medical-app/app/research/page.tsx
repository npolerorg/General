import { Suspense } from "react";
import DailyDigest from "./components/DailyDigest";
import ActiveAlerts from "./components/ActiveAlerts";
import RecentFindings from "./components/RecentFindings";
import WatchList from "./components/WatchList";
import ResearchChat from "./components/ResearchChat";

export const metadata = {
  title: "Investigación — Boris Medical App",
  description: "Centro de investigación clínica dedicado al caso de Boris Buvinic",
};

export default function ResearchPage(): JSX.Element {
  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-8 space-y-6">
        <Suspense fallback={<Skel label="Cargando digesto de hoy" />}>
          <DailyDigest />
        </Suspense>
        <Suspense fallback={<Skel label="Cargando alertas activas" />}>
          <ActiveAlerts />
        </Suspense>
        <Suspense fallback={<Skel label="Cargando hallazgos recientes" />}>
          <RecentFindings />
        </Suspense>
        <Suspense fallback={<Skel label="Cargando watch list" />}>
          <WatchList />
        </Suspense>
      </div>
      <aside className="col-span-4 sticky top-6 self-start h-[calc(100vh-3rem)]">
        <ResearchChat />
      </aside>
    </div>
  );
}

function Skel({ label }: { label: string }): JSX.Element {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <p className="text-sm text-neutral-500">{label}…</p>
    </section>
  );
}
