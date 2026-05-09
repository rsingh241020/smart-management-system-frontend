function SummaryCard({ label, value, accent = 'bg-slate-950 text-white', icon: Icon }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-4xl font-bold tracking-tight text-slate-950">{value}</p>
        </div>
        <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-xs font-bold transition duration-200 group-hover:scale-105 ${accent}`}>
          {Icon ? <Icon size={20} /> : 'Live'}
        </span>
      </div>
    </div>
  );
}

export default SummaryCard;
