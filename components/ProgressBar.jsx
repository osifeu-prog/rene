export default function ProgressBar({ completed, total }) {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0
  
  const getMessage = () => {
    if (total === 0) return '🚀 מתחילים...'
    if (progress >= 100) return '🎉 השלמת הכל!'
    if (progress >= 75) return '💪 כמעט שם!'
    if (progress >= 50) return '🚀 חצי דרך!'
    if (progress >= 25) return '🌟 התחלה טובה!'
    return '📚 מתחילים ללמוד...'
  }
  
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
        <span className="progress-message">{getMessage()}</span>
      </div>
    </div>
  )
}
