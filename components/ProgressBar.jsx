export default function ProgressBar({ percent = 0 }) {
  return (
    <div className="w-full bg-slate-200 rounded h-4 overflow-hidden">
      <div style={{ width: percent + '%' }} className="h-4 bg-gradient-to-r from-green-400 to-blue-500"></div>
    </div>
  )
}
