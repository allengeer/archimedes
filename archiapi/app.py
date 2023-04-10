from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from promptworx import promptworx
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'files'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'docx'}


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
CORS(app)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

grade_levels = ["elementary", "intermediate", "high school", "bachelors", "masters", "doctorate"]
@app.route('/grade_papers', methods=['POST'])
def grade_papers():
    grade = grade_levels[int(request.form.get('grade'))-1]
    file = request.files.get('file')
    if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    print("Grade Papers")
    resp = promptworx.userquery(f"Please provide an estimated grade for the following paper located at 'files/{secure_filename(file.filename)}' at the estimated grade level of {grade}.")
    # Process the submitted data and file here
    response = {"gpt": resp}
    return jsonify(response)

@app.route('/plan_lesson', methods=['POST'])
def plan_lesson():
    subject = request.form.get('subject')
    grade = grade_levels[int(request.form.get('grade'))-1]
    duration = request.form.get('duration')
    print("Plan Lesson")
    resp = promptworx.userquery(f"Please provide a lesson plan for the following subject: {subject}\n\nFor the following grade level - {grade}\n\nFor the duration of {duration}.")
    # Process the submitted data and file here
    response = {"gpt": resp}
    return jsonify(response)

@app.route('/paper_feedback', methods=['POST'])
def paper_feedback():
    feedback = request.form.get('feedback')
    file = request.files.get('file')
    if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    resp = promptworx.userquery(f"Please provide the following type of feedback for the file at 'files/{secure_filename(file.filename)}'  - {feedback}.")
    # Process the submitted data and file here
    response = {"gpt": resp}
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=4200, debug=True)