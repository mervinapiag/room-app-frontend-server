import React, { useState } from 'react';
// import '../styles/styles.css';
import { io } from "socket.io-client";
import { createRoomAPI } from '../utils/api';
const socket = io('http://localhost:1337');
const CreateRoomModal = ({ createRoom, closeModal }) => {
  const [roomName, setRoomName] = useState('');

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(socket.id);

    let obj = {
      data: {
        room_name: roomName, is_private: true
      }
    }
    await createRoomAPI(obj).then(function(response) {
        socket.emit("createRoom", {action: "room_created", data: {
          room:{ id: response.id, name: response.name , owner: 1 }, //room owner - loggedUser 
          }
        });
    });

    setRoomName('');
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create Room</h2>
          <button onClick={closeModal}>Close</button>
        </div>
        <form className="modal-form" onSubmit={handleFormSubmit}>
          <label>
            Room Name:
            <input type="text" value={roomName} onChange={handleInputChange} />
          </label>
          <button type="submit" className="create-room-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
