// require('dotenv').config();
import { Inter } from 'next/font/google'
import { Box,SimpleGrid, Button, Input   } from '@chakra-ui/react'
import {React, useState, useEffect} from 'react';
const inter = Inter({ subsets: ['latin'] })
import CreateRoomModal from '../components/CreateRoomModal';
import { io } from "socket.io-client";

import styles from '../styles/styles.module.css';
import { fetchData, joinRoom, createRoomAPI } from '../utils/api';
const socket = io('http://localhost:1337');
// import '../styles/styles.css';
export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [playerId, setPlayerId] = useState(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const createRoom = (name) => {
    // const newRoom = { id: Date.now(), name: name };
    // setRooms([...rooms, newRoom]);
    closeModal();
  };

  const initRooms = async () => {
    const roomList = await fetchData();
    console.log(roomList)
    setRooms(roomList.data);
  };
  
  const handleJoinRoom = async (roomId) => {
    const joined = await joinRoom(roomId).then(function(response) {
      switch(response.status) {
        case 200 : 
          socket.emit("joinRoom", {action: "join_room", data: {
            room:{ id: response.data.room.id, joiner: 2}, //joiner - currrent logged in User
            }
          });
          break;
      }
    });
  }

  const handleFormSubmit = async () => {

    let obj = {
      data: {
        room_name: 'room 101', is_private: true
      }
    }

    await createRoomAPI(obj).then(function(response) {
        socket.emit("createRoom", {action: "room_created", data: {
          room:{ id: response.id, name: response.name , owner: 1 }, //room owner - loggedUser 
          }
        });
    });

    // setRoomName('');
  };

  useEffect(() => {
    initRooms();

    socket.on('connect', () => {
      setPlayerId(socket.id);
    });


    socket.on('userJoined', (data) => {
        console.log(`${data.username} Joined in the room`);
    });

    socket.on('emitToAll', (request) => {

      switch(request.action) {
        case 'room_created':
          setRooms([...rooms, request.data.room])
          break;
        default:
          console.log("errorrrrrrrrrrrs")
      }

    });

  }, []);



  return (
    <div className={styles.container}>
      <h1>MY ID: {playerId} </h1>
      <h1>List of Rooms</h1>
      <ul className={styles.roomList}>
        {rooms.map((room) => (
          <div key={room.id}>
            <li key={room.id}>{room.name}   -  <button className={styles.createRoomBtn} onClick={() => {
              handleJoinRoom(room.id);
            }}>join Room</button> </li>
          </div>
        ))}
      </ul>
      <button className={styles.createRoomBtn} onClick={() => {
              handleFormSubmit();
            }}>
        Create Room
      </button>
    </div>
  );
}