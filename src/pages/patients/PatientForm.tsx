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
    radiating: '',
    sciatica: '',
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
    doc.text(`Radiating: ${formData.radiating}`, 10, 150);
    doc.text(`Sciatica: ${formData.sciatica}`, 10, 160);
    doc.text(`Notes: ${formData.notes}`, 10, 170);
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

          {createCheckboxGroup('Physical Symptoms', 'physical', ['Loss of Consciousness (LOC)', 'Ringing in the ears (tinnitus)', 'Visual Problems', 'Nausea', 'Vomiting (emesis)', 'Balance Problems', 'Muscle Weakness (myasthenia)', 'Difficulty Breathing (dyspnea)'])}
          {createCheckboxGroup('Sleep Issues', 'sleep', ['Less Sleep due to Pain', 'Sleeping More than Usual', 'Trouble Falling Asleep', 'Drowsiness'])}
          {createCheckboxGroup('Cognitive Symptoms', 'cognitive', ['Feeling Mentally Foggy', 'Feeling Slowed Down', 'Difficulty Remembering', 'Difficulty Concentrating'])}
          {createCheckboxGroup('Digestive Symptoms', 'digestive', ['Digestive Difficulties', 'Loss of Appetite', 'Diarrhea', 'Constipation', 'Difficulty Swallowing (dysphagia)'])}
          {createCheckboxGroup('Emotional Symptoms', 'emotional', ['Depression', 'Stress', 'Anxiety'])}

          {createCheckboxGroup('Affected Body Parts', 'bodyPart', ['C/S', 'T/S', 'L/S', 'SH', 'ELB', 'WR', 'Hand', 'Finger(s)', 'Hip', 'KN', 'AN', 'Foot', 'Toe(s)', 'L Ant/Post/Lat/Med', 'R Ant/Post/Lat/Med', 'Headache', 'Frontal', 'Parietal', 'Temporal', 'Occipital', 'Head contusion'])}

          {createCheckboxGroup('Quality of Pain', 'quality', ['Achy', 'Dull', 'Sharp', 'Stabbing', 'Throbbing', 'Burning', 'Crushing'])}

          {createCheckboxGroup('Exacerbated By', 'exacerbatedBy', [
            'Rest', 'Increased Activity', 'Prolonged Work', 'School', 'Stress', 'Looking Up/Down',
            'Looking Side to Side', 'Overhead Reach', 'Sitting', 'Standing', 'Walking', 'Twisting',
            'Stooping', 'Bend', 'Squat', 'Kneel', 'Lifting', 'Carrying', 'Serving', 'Pulling/Pushing',
            'Grip/Grasp', 'Chiro', 'Physio', 'Exercise', 'Ice', 'Heat', 'Changes in the Weather'
          ])}

          {createCheckboxGroup('Symptoms', 'symptoms', [
            'Tenderness', 'Soreness', 'Stiffness', 'Tightness', 'Loss of Motion', 'Locking',
            'Grinding', 'Popping', 'Clicking', 'Joint Instability', 'Joint Redness', 'Tingling',
            'Numbness', 'Swelling', 'Weakness', 'Pulling', 'Dropping Objects', 'Dizziness',
            'Nausea', 'Hearing Loss', 'TMJ', 'Double Vision', 'Blurry Vision', 'Photosensitivity',
            'Throat Pain', 'Fever', 'Rash', 'Loss of Bowel or Bladder'
          ])}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="severity" placeholder="Severity (1-10 or Mild/Moderate/Severe)" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
            <input type="text" name="timing" placeholder="Timing (e.g., Constant, Frequent)" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
            <input type="text" name="context" placeholder="Context (e.g., New, Improving)" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
          </div>

          <input type="text" name="radiating" placeholder="Radiating to..." className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
          <input type="text" name="sciatica" placeholder="Sciatica (R/L)" className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
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
