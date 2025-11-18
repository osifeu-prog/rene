import { useState } from 'react'
import { createUserProgress } from '../lib/database'

export default function TaskCard({ task, isCompleted, onTaskComplete }) {
  const [submission, setSubmission] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!submission.trim()) {
      alert('❌ אנא הכנס פתרון לפני השליחה')
      return
    }
    
    setIsSubmitting(true)
    try {
      console.log(`📤 שולח פתרון למשימה: ${task.title}`)
      await createUserProgress('demo-user', task.id, submission)
      onTaskComplete(task.id, submission)
      setSubmission('')
      console.log('✅ הפתרון נשמר בהצלחה!')
    } catch (error) {
      console.error('❌ שגיאה בשליחת הפתרון:', error)
      alert('❌ שגיאה בשמירת הפתרון')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>🎯 {task.title}</h3>
        <span className="task-order">#{task.order_index}</span>
        {isCompleted && <span className="completed-badge">✅ הושלם!</span>}
      </div>
      
      <p className="task-description">{task.description}</p>
      
      {task.code_challenge && (
        <div className="code-section">
          <h4>💻 אתגר הקוד:</h4>
          <pre className="code-challenge">{task.code_challenge}</pre>
        </div>
      )}
      
      {!isCompleted && (
        <div className="submission-section">
          <textarea
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            placeholder="הכנס את הפתרון שלך כאן..."
            rows={4}
            className="submission-textarea"
          />
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !submission.trim()}
            className="submit-btn"
          >
            {isSubmitting ? '🔄 שולח...' : '🚀 שלח פתרון'}
          </button>
        </div>
      )}
      
      {isCompleted && (
        <div className="completed-message">
          <p>🎉 כל הכבוד! השלמת את המשימה הזו.</p>
        </div>
      )}
    </div>
  )
}
