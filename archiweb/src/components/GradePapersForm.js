import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';

const GradePapersForm = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    console.log(values);
    formData.append('grade', values.grade);
    formData.append('file', fileUpload);
  
    try {
      const response = await fetch('http://localhost:4200/grade_papers', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log(data);
      setApiResponse(data.gpt);
    } catch (error) {
      console.error('Error:', error);
    }
  
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ grade: '', file: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
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

export default GradePapersForm;