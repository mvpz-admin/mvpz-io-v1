import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseWithSocket = NextApiResponse & {
  socket: {
    server: any;
  };
};

export default function handler(req: NextApiRequest, res: ResponseWithSocket) {
  if (!res.socket?.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("sendNotification", (data) => {
        console.log("Notification received:", data);
        io.emit("receiveNotification", data); // Send notification to all clients
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
