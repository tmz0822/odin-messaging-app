import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useForm } from 'react-hook-form';
import { API_URL } from '../config/api';

import '../styles/UserProfile.css';
import { userService } from '../services/userService';

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    bio: user.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setFormData({
      bio: user.bio || '',
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    try {
      setUploading(true);
      const response = await userService.uploadAvatar(selectedFile);

      console.log(response);
      setUser((prevUser) => ({
        ...prevUser,
        avatar: response.avatar,
      }));
    } catch (error) {
      console.error('Error uploading avatar: ', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Update profile
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="user-profile">
      <h1>Your profile</h1>

      <div className="user-profile__avatar">
        <img
          src={`${API_URL}${user.avatar}`}
          alt={`${user.username}'s avatar`}
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadAvatar} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <form className="user-profile__details" onSubmit={handleSubmit}>
        <div className="user-profile__field">
          <label htmlFor="username">Username</label>
          <input id="username" value={user.username} readOnly />
        </div>

        <div className="user-profile__field">
          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <button type="reset" onClick={resetFormData}>
          Reset
        </button>
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default UserProfile;
