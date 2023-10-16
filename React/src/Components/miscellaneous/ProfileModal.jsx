import { ViewIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { useState } from "react";
import {
  useDisclosure,
  IconButton,
  MenuItem,
  DrawerCloseButton,
  Button
} from "@chakra-ui/react";
import { DrawerBody, Drawer, DrawerContent, DrawerOverlay, DrawerHeader } from "@chakra-ui/react";
import './style.css'


const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img htmlFor="photo-upload" src={src} alt="Profile Preview" />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);


const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('sm')
  const handleClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  // const sizes = ['sm']
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // input

  const [value, setValue] = useState('John');
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  // about details
  const [value1, setValue1] = useState('how are you ?');
  const [editMode1, setEditMode1] = useState(false);


  const handleEditClick1 = () => {
    setEditMode1(true);
  };

  const handleSaveClick1 = () => {
    setEditMode1(false);
  };

  const handleInputChange1 = (event) => {
    setValue1(event.target.value);
  };
  return (
    <>
      {
        children ? (
          <span onClick={onOpen} > {children}</span>
        ) : (
          <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
        )
      }
      <Drawer onClose={onClose} isOpen={isOpen}
        size={
          children ? (size) : null
        }>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <div className="profile__wrapper">
              <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
            </div>
            <div className="edit-section-name">
              <div className="name-sec">
                <span>Your Name</span>
              </div>
              {editMode ? (
                <div className="edit-input">
                  <div className="input-box">
                    <input type="text" value={value} onChange={handleInputChange} />
                    <div> <button onClick={handleSaveClick}><FontAwesomeIcon icon={faCheck} className="check-icon" /></button></div>
                  </div>
                </div>
              ) : (
                <div className="edit-name">
                  <span>{value}</span>
                  <button onClick={handleEditClick}><FontAwesomeIcon icon={faPen} /></button>
                </div>
              )}
            </div>
            <div className="edit-section-about">
              <div className="name-sec">
                <span>About</span>
              </div>
              {editMode1 ? (
                <div className="edit-input">

                  <div className="input-box">
                    < div className="input-1">
                      <input type="text" value={value1} onChange={handleInputChange1} />
                      <label id="count">{value1.length}</label>
                    </div>
                    <button onClick={handleSaveClick1}><FontAwesomeIcon icon={faCheck} className="check-icon1" /></button>
                  </div>
                </div>
              ) : (
                <div className="edit-name">
                  <span>{value1}</span>
                  <button onClick={handleEditClick1}><FontAwesomeIcon icon={faPen} /></button>
                </div>
              )}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
};



export default ProfileModal;



