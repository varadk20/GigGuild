import { useState } from 'react';
import { storage, db } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const ProjectForm = ({ user }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async () => {
    try {
      let imageUrl = '';
      let videoUrl = '';

      if (imageFile) {
        const imageRef = ref(storage, `projects/${user.uid}/${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      if (videoFile) {
        const videoRef = ref(storage, `projects/${user.uid}/${videoFile.name}`);
        const snapshot = await uploadBytes(videoRef, videoFile);
        videoUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'projects'), {
        userId: user.uid,
        name: projectName,
        description: description,
        imageUrl: imageUrl,
        videoUrl: videoUrl
      });
    } catch (error) {
      console.log("Error uploading project: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
      <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
      <button type="submit">Upload Project</button>
    </form>
  );
};

export default ProjectForm;
