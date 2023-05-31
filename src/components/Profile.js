import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSnackbar } from 'notistack';
import { auth } from "../firebase";

function Profile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("志摩直樹");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("29");
  const [image, setImage] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName);
      setImage(auth.currentUser.photoURL);
    }
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleImageChange = (e) => setImage(URL.createObjectURL(e.target.files[0]));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the profile
    closeModal();
    enqueueSnackbar('Profile updated successfully!', { variant: 'success', autoHideDuration: 4000 });
  };

  return (
    <div className="profile-container default-page">
      <div className="userinfo">
        <img src={image} alt={name} className="user-image"></img>
        <p className="user-name">Name: {name}</p>
        <p>Gender: {gender}</p>
        <p>Age: {age}</p>
        <button onClick={openModal}>Edit</button>
      </div>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        contentLabel="Edit Profile"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex',
            alignItems: 'center',
          },
          content: {
            position: 'relative',
            left: 'auto',
            right: 'auto',
            width: '40%',
            margin: 'auto',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={image} alt={name} className="user-image"></img>
            <label style={{ marginLeft: '20px'}}>
              <button style={{ borderRadius: '12px', backgroundColor: 'black', color: 'white', padding: '10px 20px' }}>Upload</button>
              <input style={{ display: 'none' }} type="file" onChange={handleImageChange} />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label>
            <div>
              <input type="text" value={name} onChange={handleNameChange} />
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Gender:</label>
            <div>
              <label>
                <input type="radio" value="Male" checked={gender === "Male"} onChange={handleGenderChange} />
                Male
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input type="radio" value="Female" checked={gender === "Female"} onChange={handleGenderChange} />
                Female
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input type="radio" value="None" checked={gender === "None"} onChange={handleGenderChange} />
                None
              </label>
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Age:</label>
            <input type="number" style={{ width: '60px' }} value={age} onChange={handleAgeChange} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button style={{ background: 'none', border: 'none', marginRight: '5px' }} onClick={closeModal}>Cancel</button>
            <button style={{ borderRadius: '12px', backgroundColor: 'black', color: 'white', padding: '10px 20px' }} type="submit">Update</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Profile;
