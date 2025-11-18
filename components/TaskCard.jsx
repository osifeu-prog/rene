import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function TaskCard({ task, isCompleted, onTaskComplete }) {
  const [submission, setSubmission] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!submission.trim()) return
    
    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('user_progress')
        .insert({
          user_id: user.id,
          task_id: task.id,
          submission_text: submission,
          completed: true
        })

      if (!error) {
        onTaskComplete(task.id)
        setSubmission('')
      }
    } catch (error) {
      console.error('Error submitting task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>🎯 {task.title}</h3>
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
            {isSubmitting ? 'שולח...' : 'שלח פתרון 🚀'}
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
