export default function TaskCard({ task, onToggle }) {
  return (
    <div className="p-4 bg-white rounded shadow flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        {task.description && <p className="text-sm text-slate-500">{task.description}</p>}
      </div>
      <div>
        <button onClick={onToggle} className={"px-3 py-1 rounded " + (task.completed ? 'bg-green-600 text-white' : 'bg-slate-200')}>
          {task.completed ? 'Done' : 'Mark'}
        </button>
      </div>
    </div>
  )
}
