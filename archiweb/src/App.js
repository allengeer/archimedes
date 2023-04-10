import React, { useState } from 'react';
import Header from './components/Header';
import GradePapersForm from './components/GradePapersForm';
import PlanLessonForm from './components/PlanLessonForm';
import PaperFeedbackForm from './components/PaperFeedbackForm';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('');

  const handleButtonClick = (formName) => {
    setActiveForm(formName);
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'gradePapers':
        return <GradePapersForm />;
      case 'planLesson':
        return <PlanLessonForm />;
      case 'paperFeedback':
        return <PaperFeedbackForm />;
      default:
        return null;
      }
    };
  
    return (
      <div className="App" style={{ minHeight: '100vh' }}>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-primary" onClick={() => handleButtonClick('gradePapers')}>
                Grade Papers
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary" onClick={() => handleButtonClick('planLesson')}>
                Plan a Lesson
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary" onClick={() => handleButtonClick('paperFeedback')}>
                Paper Feedback
              </button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              {renderForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default App;