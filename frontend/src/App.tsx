import './style.css'
import { SubmissionForm } from './components/SubmissionForm'

/**
 * App Component
 * 
 * Komponen utama aplikasi yang menampung form submission.
 * Form mencakup input nama, email, telepon, dan upload gambar.
 */
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Cheil Submission Form</h1>
        <p>Silakan isi form di bawah ini untuk mengirim submission Anda</p>
      </header>
      
      <main className="app-main">
        <SubmissionForm />
      </main>

      <footer className="app-footer">
        <p>© 2025 Cheil Indonesia. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

