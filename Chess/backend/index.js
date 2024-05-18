const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { Pool } = require('pg');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chess',
  password: 'password',
  port: 5432,
});

io.on('connection', (socket) => {
  console.log("Connected", socket.id);

  socket.on('disconnect', () => {
    console.log("Disconnect", socket.id);
  });

  socket.on('move', async (data) => {
    await saveMoveToDatabase(data);
    io.emit('update', data);
  });

  socket.on('chatMessage', async (data) => {
    await saveChatMessage(data);
    io.emit('newChatMessage', data);
  });

  socket.on('gameResult', async (data) => {
    await saveGameResult(data);
    io.emit('updateGameResult', data);
  });

  socket.on('userNames', async (data) => {
    await saveUserNames(data);
    io.emit('updateUserNames', data);
  });
});

async function saveMoveToDatabase(moveData) {
  try {
    const query = 'INSERT INTO moves (game_id, from_square, to_square, piece, promotion) VALUES ($1, $2, $3, $4, $5)';
    const values = [moveData.gameId, moveData.from, moveData.to, moveData.piece, moveData.promotion];

    await pool.query(query, values);
  } catch (err) {
    console.error('Error saving move to database:', err);
  }
}

async function saveChatMessage(chatData) {
  try {
    const query = 'INSERT INTO chat_messages (game_id, user_id, message) VALUES ($1, $2, $3)';
    const values = [chatData.gameId, chatData.userId, chatData.message];

    await pool.query(query, values);
  } catch (err) {
    console.error('Error saving chat message to database:', err);
  }
}

async function saveGameResult(resultData) {
  try {
    const query = 'INSERT INTO game_results (game_id, winner, result_type) VALUES ($1, $2, $3)';
    const values = [resultData.gameId, resultData.winner, resultData.resultType];

    await pool.query(query, values);
  } catch (err) {
    console.error('Error saving game result to database:', err);
  }
}

async function saveUserNames(userData) {
  try {
    const query = 'INSERT INTO users (game_id, user_id, username) VALUES ($1, $2, $3)';
    const values = [userData.gameId, userData.userId, userData.username];

    await pool.query(query, values);
  } catch (err) {
    console.error('Error saving user names to database:', err);
  }
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
