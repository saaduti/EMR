import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

const PatientSubjectiveForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    date: '',
    physical: [],
    sleep: [],
    cognitive: [],
    digestive: [],
    emotional: [],
    bodyPart: [],
    severity: '',
    quality: [],
    timing: '',
    context: '',
    exacerbatedBy: [],
    symptoms: [],
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v: string) => v !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('subjectiveFormData', JSON.stringify(formData));

    const doc = new jsPDF();
    doc.text(`Patient Name: ${formData.fullName}`, 10, 10);
    doc.text(`Date: ${formData.date}`, 10, 20);
    doc.text(`Physical: ${formData.physical.join(', ')}`, 10, 30);
    doc.text(`Sleep: ${formData.sleep.join(', ')}`, 10, 40);
    doc.text(`Cognitive: ${formData.cognitive.join(', ')}`, 10, 50);
    doc.text(`Digestive: ${formData.digestive.join(', ')}`, 10, 60);
    doc.text(`Emotional: ${formData.emotional.join(', ')}`, 10, 70);
    doc.text(`Body Part: ${formData.bodyPart.join(', ')}`, 10, 80);
    doc.text(`Severity: ${formData.severity}`, 10, 90);
    doc.text(`Quality: ${formData.quality.join(', ')}`, 10, 100);
    doc.text(`Timing: ${formData.timing}`, 10, 110);
    doc.text(`Context: ${formData.context}`, 10, 120);
    doc.text(`Exacerbated By: ${formData.exacerbatedBy.join(', ')}`, 10, 130);
    doc.text(`Symptoms: ${formData.symptoms.join(', ')}`, 10, 140);
    doc.text(`Notes: ${formData.notes}`, 10, 150);
    doc.save('Subjective_Form.pdf');

    navigate('/patients');
  };

  const createCheckboxGroup = (label: string, name: string, options: string[]) => (
    <div className="mb-6">
      <p className="font-semibold text-gray-800 text-lg mb-2 border-l-4 border-blue-500 pl-2">{label}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map(opt => (
          <label key={opt} className="flex items-center text-gray-700">
            <input type="checkbox" name={name} value={opt} onChange={handleChange} className="mr-2 text-blue-600 focus:ring-blue-500" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  return (

    <div className="p-6 bg-gray-50 min-h-screen">
      
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Patient Subjective Intake Form</h1>
      <Card className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="fullName" placeholder="Full Name" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
            <input type="date" name="date" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          </div>
      <table className="w-full border border-gray-300 text-sm text-left">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">PHYSICAL</th>
                <th className="border border-gray-300 p-2">SLEEP</th>
                <th className="border border-gray-300 p-2">DIGESTIVE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  <div><input type="checkbox" /> Loss of Consciousness (LOC)</div>
                  <div><input type="checkbox" /> Ringing in the ears (tinnitus)</div>
                  <div><input type="checkbox" /> LT RT B/L</div>
                  <div><input type="checkbox" /> Visual Problems</div>
                  <div><input type="checkbox" /> Nausea</div>
                  <div><input type="checkbox" /> Vomiting (emesis)</div>
                  <div><input type="checkbox" /> Balance Problems</div>
                  <div><input type="checkbox" /> Muscle Weakness (myasthenia)</div>
                  <div><input type="checkbox" /> Difficulty Breathing (dyspnea)</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div><input type="checkbox" /> Less Sleep due to Pain</div>
                  <div><input type="checkbox" /> Sleeping More than Usual</div>
                  <div><input type="checkbox" /> Trouble Falling Asleep</div>
                  <div><input type="checkbox" /> Drowsiness</div>
                  <strong>COGNITIVE</strong>
                  <div><input type="checkbox" /> Feeling Mentally Foggy</div>
                  <div><input type="checkbox" /> Feeling Slowed Down</div>
                  <div><input type="checkbox" /> Difficulty Remembering</div>
                  <div><input type="checkbox" /> Difficulty Concentrating</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div><input type="checkbox" /> Digestive Difficulties</div>
                  <div><input type="checkbox" /> Loss of Appetite</div>
                  <div><input type="checkbox" /> Diarrhea</div>
                  <div><input type="checkbox" /> Constipation</div>
                  <div><input type="checkbox" /> Difficulty Swallowing (dysphagia)</div>
                  <strong>EMOTIONAL</strong>
                  <div><input type="checkbox" /> Depression</div>
                  <div><input type="checkbox" /> Stress</div>
                  <div><input type="checkbox" /> Anxiety</div>
                </td>
              </tr>
            </tbody>
</table>
      
          <div className="mt-8 space-y-6">
  <h2 className="text-xl font-bold text-gray-800">BODY PART</h2>
  
  {/* Body Part checkboxes */}
  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
    {['C/S', 'T/S', 'L/S', 'SH', 'ELB', 'WR', 'Hand', 'Finger(s)', 'Hip', 'KN', 'AN', 'Foot', 'Toe(s)', 'L Ant/Post/Lat/Med', 'R Ant/Post/Lat/Med'].map(part => (
      <label key={part} className="flex items-center space-x-1">
        <input type="checkbox" name="bodyPart" value={part} onChange={handleChange} />
        <span>{part}</span>
      </label>
    ))}
  </div>

  {/* Head-related parts */}
  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
    {['Headache', 'Frontal', 'Parietal', 'Temporal', 'Occipital', 'Head contusion'].map(part => (
      <label key={part} className="flex items-center space-x-1">
        <input type="checkbox" name="bodyPart" value={part} onChange={handleChange} />
        <span>{part}</span>
      </label>
    ))}
    <label className="flex items-center space-x-1">
      <input type="checkbox" name="bodyPart" value="Other" onChange={handleChange} />
      <span>Other</span>
      <input type="text" name="bodyPartOther" placeholder="Specify" className="ml-2 border rounded px-2 py-1 text-sm" />
    </label>
  </div>

  {/* Severity */}
  <div className="font-semibold text-gray-800 text-lg mb-2 border-l-4 border-blue-500 pl-2">SEVERITY</div>
  <div className="flex flex-wrap gap-2 text-sm">
    {['1','2','3','4','5','6','7','8','9','10','Mild','Moderate','Severe'].map(val => (
      <label key={val} className="flex items-center space-x-1">
        <input type="radio" name="severity" value={val} onChange={handleChange} />
        <span>{val}</span>
      </label>
    ))}
  </div>

  {/* Quality */}
  <div className="font-semibold text-gray-800 text-lg mb-2 border-l-4 border-blue-500 pl-2">QUALITY</div>
  <div className="flex flex-wrap gap-4 text-sm">
    {['Achy', 'Dull', 'Sharp', 'Stabbing', 'Throbbing', 'Burning', 'Crushing'].map(val => (
      <label key={val} className="flex items-center space-x-1">
        <input type="checkbox" name="quality" value={val} onChange={handleChange} />
        <span>{val}</span>
      </label>
    ))}
    <span className="flex items-center ml-4">
      Radiating to:
      <input type="text" name="radiatingTo" className="ml-2 border rounded px-2 py-1 text-sm w-60" />
    </span>
  </div>

  {/* Timing */}
   <div className="font-semibold text-gray-800 text-lg mb-2 border-l-4 border-blue-500 pl-2">TIMING</div>
  <div className="flex gap-4 text-sm">
    {['Constant', 'Frequent', 'Intermittent', 'Occasional', 'Activity Dependent'].map(val => (
      <label key={val} className="flex items-center space-x-1">
        <input type="radio" name="timing" value={val} onChange={handleChange} />
        <span>{val}</span>
      </label>
    ))}
  </div>

  {/* Context */}
     <div className="font-semibold text-gray-800 text-lg mb-2 border-l-4 border-blue-500 pl-2">CONTEXT</div>
  <div className="flex gap-4 text-sm">
    {['New', 'Improving', 'Worsening', 'Recurrent'].map(val => (
      <label key={val} className="flex items-center space-x-1">
        <input type="radio" name="context" value={val} onChange={handleChange} />
        <span>{val}</span>
      </label>
    ))}
  </div>

  {/* Exacerbated By */}
  {createCheckboxGroup('EXACERBATED BY', 'exacerbatedBy', [
    'Rest', 'Increased Activity', 'Prolonged Work', 'School', 'Stress',
    'Looking Up/Down', 'Looking Side to Side', 'Overhead Reach', 'Sitting',
    'Standing', 'Walking', 'Twisting', 'Stooping', 'Bend', 'Squat', 'Kneel',
    'Lifting', 'Carrying', 'Serving', 'Pulling/Pushing', 'Grip/Grasp', 'Chiro',
    'Physio', 'Exercise', 'Ice', 'Heat', 'Changes in the Weather'
  ])}

  {/* Symptoms */}
  {createCheckboxGroup('SIGNS/SYMPTOMS', 'symptoms', [
    'Tenderness', 'Soreness', 'Stiffness', 'Tightness', 'Loss of Motion', 'Locking', 'Grinding', 'Popping', 'Clicking',
    'Joint Instability', 'Joint Redness', 'Tingling', 'Numbness', 'Swelling', 'Weakness', 'Pulling', 'Dropping Objects',
    'Dizziness', 'Nausea', 'Hearing Loss', 'TMJ', 'Double Vision', 'Blurry Vision', 'Photosensitivity',
    'Throat Pain', 'Fever', 'Rash', 'Loss of Bowel or Bladder',
    'Feeling Mentally Foggy', 'Feeling Slowed Down', 'Difficulty Remembering', 'Difficulty Concentrating'
  ])}

  {/* Radiating / Sciatica */}
  <div className="font-semibold text-gray-800 text-lg mb-2 border-l-4 border-blue-500 pl-2">
    <label className="flex items-center gap-2">
      Radiating:
      <input type="checkbox" name="radiatingRight" value="R" onChange={handleChange} /> R
      <input type="checkbox" name="radiatingLeft" value="L" onChange={handleChange} /> L
    </label>
    </div>
    <div className="font-semibold text-gray-800 text-lg mb-2 border-l-4 border-blue-500 pl-2">
    <label className="flex items-center gap-2">
      Sciatica:
      <input type="checkbox" name="sciaticaRight" value="R" onChange={handleChange} /> R
      <input type="checkbox" name="sciaticaLeft" value="L" onChange={handleChange} /> L
    </label>
  </div>

  {/* Notes */}
  <div className="mt-4">
    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes:</label>
    <textarea name="notes" id="notes" rows={3} className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
  </div>
</div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" name="severity" placeholder="Severity (1-10)" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
            <input type="text" name="timing" placeholder="Timing (e.g., Constant)" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
            <input type="text" name="context" placeholder="Context (e.g., Worsening)" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
          </div>

          <textarea name="notes" placeholder="Additional Notes" rows={4} className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />

          <div className="flex justify-end space-x-4 mt-4">
            <Button type="button" variant="secondary" onClick={() => navigate('/patients')}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </div>
    
  );
};

export default PatientSubjectiveForm;
