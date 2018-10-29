import { Socket } from "./phoenix";

// TODOs:
// Add backend socket
// Make it auth based on the JWT on backend
// Only once you load initial data should you connect to the socket
// When you log out, disconnect
// When you log back in, reconnect to the socket

export default function() {
  const socket = new Socket("/socket", { params: { userToken: "123" } });
  socket.connect(null);
}
