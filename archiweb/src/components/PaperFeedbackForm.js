import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';

const PaperFeedbackForm = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('feedback', values.feedback);
    formData.append('file', fileUpload);
  
    try {
      const response = await fetch('http://localhost:4200/paper_feedback', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      setApiResponse(data.gpt);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ feedback: '', file: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="feedback">What would you like feedback on?</label>
            <Field type="text" name="feedback" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="file">File:</label>
            <input type="file" name="file" className="form-control" onChange={(event) => { console.log(event.currentTarget.files[0]); setFileUpload(event.currentTarget.files[0]) }} />
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
export default PaperFeedbackForm;