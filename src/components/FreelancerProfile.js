import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useState } from 'react';

const FreelancerProfile = ({ user }) => {
  const [primarySkill, setPrimarySkill] = useState('');
  const [otherSkills, setOtherSkills] = useState('');

  const handleSaveProfile = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        primarySkill: primarySkill,
        otherSkills: otherSkills.split(',').map(skill => skill.trim())
      });
    } catch (error) {
      console.log("Error saving profile: ", error);
    }
  };

  return (
    <div>
      <input type="text" value={primarySkill} onChange={(e) => setPrimarySkill(e.target.value)} placeholder="Primary Skill" />
      <input type="text" value={otherSkills} onChange={(e) => setOtherSkills(e.target.value)} placeholder="Other Skills (comma separated)" />
      <button onClick={handleSaveProfile}>Save Profile</button>
    </div>
  );
};

export default FreelancerProfile;
