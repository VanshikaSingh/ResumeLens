import OverviewSection from "../components/overview/OverviewSection";

type DashboardProps = {
  analysis: any;
};

export default function Dashboard({ analysis }: DashboardProps) {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">
          Resume Analysis
        </h1>

        <OverviewSection overview={analysis.overview} />
      </div>
    </div>
  );
}