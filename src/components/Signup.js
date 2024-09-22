import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../utils/firebase'; // import the firebase configuration

const SignUp = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Store user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        role: '', // either freelancer or recruiter
        username: '',
        skills: [],
        projects: []
      });
      console.log("User signed up: ", user);
    } catch (error) {
      console.log("Error during sign-up: ", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Sign up with Google
    </button>
  );
};

export default SignUp;
