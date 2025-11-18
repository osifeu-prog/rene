export default function ProgressBar({ completed, total }) {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return (
    <div className="progress-container">
      <div className="progress-header">
        <h3>התקדמות שלך</h3>
        <span>{completed} / {total} משימות</span>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="progress-text">
        <span>{progress}% הושלמו</span>
      </div>
    </div>
  )
}
