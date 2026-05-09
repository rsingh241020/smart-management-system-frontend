function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <span className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-500" />
      {label}
    </span>
  );
}

export default LoadingSpinner;
