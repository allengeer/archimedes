import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';

const PlanLessonForm = () => {
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('subject', values.subject);
    formData.append('grade', values.grade);
    formData.append('duration', values.duration);
  
    try {
      const response = await fetch('http://localhost:4200/plan_lesson', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      let resp = data.gpt.replace("\\n", "<br/>");
      setApiResponse(resp);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  
    setSubmitting(false);
  };
  
    return (
      <Formik initialValues={{ subject: '', grade: '', duration: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <Field type="text" name="subject" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade Level:</label>
              <Field as="select" name="grade" className="form-control">
                <option value="">Select grade level</option>
                <option value="1">Elementary</option>
                <option value="2">Intermediate</option>
                <option value="3">High School</option>
                <option value="4">Bachelors</option>
                <option value="5">Masters</option>
                <option value="6">Doctorate</option>
              </Field>
            </div>
            <div className="form-group">
              <label htmlFor="duration">Lesson Duration:</label>
              <Field as="select" name="duration" className="form-control">
                <option value="">Select duration</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </Field>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Submit
          </button>
          {apiResponse && (
            <div className="mt-3 gptresponse">
              <h4>Archimedes Says:</h4>
              <div style={{whiteSpace: "pre-wrap"}}>{apiResponse}</div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PlanLessonForm;