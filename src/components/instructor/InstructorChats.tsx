import React, { useContext, useEffect, useState } from "react";
import { ChatSidebar } from "../common/chat/ChatSidebar";
import { ChatWindow } from "../common/chat/ChatWindow";
import { SocketContext } from "@/context/SocketProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import {
  createMessageAction,
  getChatsByUserIdAction,
  getMessagesByChatIdAction,
  updateUnreadCount,
} from "@/redux/store/actions/chat";
import Peer from "peerjs";
import { VideoCall } from "../common/chat/VideoCall";

export const InstructorChats: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.user);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [typingData, setTypingData] = useState<{
    isTyping: boolean;
    senderId: string;
  } | null>(null);
  const { socket, onlineUsers, setOnlineUsers } =
    useContext(SocketContext) || {};
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth <= 768
  );
  const [showChatWindow, setShowChatWindow] = useState<boolean>(false);
  const [chatListLoading, setChatListLoading] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<{
    [chatId: string]: number;
  }>({});
  const [peer, setPeer] = useState<Peer | null>(null);
  const [localPeerId, setLocalPeerId] = useState<string>("");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "in-call">(
    "idle"
  );
  // const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setLocalPeerId(id);
    });
    setPeer(peer);
    return () => {
      peer.destroy();
    };
  }, []);

  useEffect(() => {
    socket?.on("online-users", (users) => {
      setOnlineUsers && setOnlineUsers(users);
    });

    if (data?._id && socket) {
      socket.emit("new-user", data._id);
    }

    socket?.on("receive-message", async (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      // Update unread count
      if (message.senderId !== data?._id) {
        setUnreadCounts((prevCount) => ({
          ...prevCount,
          [message.chatId]: (prevCount[message.chatId] || 0) + 1,
        }));

        await dispatch(
          updateUnreadCount({
            _id: message.chatId,
            unreadCount: unreadCounts[message.chatId] + 1,
          })
        );
      }

      // Move the chat to the top of the list
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) =>
          chat.chatId === message.chatId
            ? { ...chat, lastMessage: message }
            : chat
        );
        const sortedChats = updatedChats.sort((a, b) =>
          new Date(b.lastMessage?.createdAt || b.createdAt) >
          new Date(a.lastMessage?.createdAt || a.createdAt)
            ? 1
            : -1
        );
        return sortedChats;
      });
    });

    socket?.on("isTyping", (senderId) => {
      if (senderId === currentChat?._id) {
        setTypingData({ isTyping: true, senderId });
        setTimeout(() => {
          setTypingData({ isTyping: false, senderId });
        }, 2000);
      }
    });

    socket?.on("get-delete-message", (messageId) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, isDeleted: true } : msg
        )
      );
    });

    socket?.on("message-seen-update", ({ messageId, userId }) => {
      if (userId !== data?._id) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId ? { ...msg, receiverSeen: true } : msg
          )
        );
      }

      // Reseting unread count
      if (currentChat?.chatId) {
        setUnreadCounts((prevCounts) => ({
          ...prevCounts,
          [currentChat.chatId]: 0,
        }));
      }
    });

    socket?.on("last-seen", (userId) => {
      console.log("lasst seen reached", userId);
    });

    //video chat------>

    socket?.on("incoming-call", (callerId) => {
      if (window.confirm("Incoming call. Accept?")) {
        console.log("callerid ----->", callerId);
        answerCall(callerId);
      }else{
        endCall()
      }
    });

    socket?.on("end-call", () => {
      endCall();
    });

    return () => {
      socket?.off("new-user");
      socket?.off("online-users");
      socket?.off("receive-message");
      socket?.off("isTyping");
      socket?.off("get-delete-message");
      socket?.off("message-seen-update");
      socket?.off("incoming-call");
      socket?.off("end-call");
    };
  }, [socket, setOnlineUsers, currentChat, data?._id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentChat && messages.length > 0) {
      const unseenMessages = messages.filter(
        (msg) => !msg.receiverSeen && msg.senderId !== data?._id
      );

      unseenMessages.forEach(() => {
        socket?.emit("message-seen", {
          roomId,
          chatId: currentChat.chatId,
          userId: data?._id,
        });
      });

      setUnreadCounts((prevCounts) => ({
        ...prevCounts,
        [currentChat.chatId]: 0,
      }));

      // Update the server about unread count reset
      dispatch(
        updateUnreadCount({
          _id: currentChat.chatId,
          unreadCount: 0,
        })
      );
    }
  }, [messages, currentChat, socket, data?._id]);

  useEffect(() => {
    fetchChatsByUserId();
  }, [data, dispatch]);

  const fetchChatsByUserId = async () => {
    if (data?._id) {
      setChatListLoading(true);
      const response = await dispatch(getChatsByUserIdAction(data?._id));


      const chatDataMap = new Map();
      const unreadCountsMap: any = {};

      response.payload.data.forEach((chat: any) => {
        const participant = chat?.participants.find(
          (participantId: any) => participantId._id !== data?._id
        );
        if (participant && !chatDataMap.has(participant._id)) {
          chatDataMap.set(participant._id, {
            ...participant,
            name: participant.userName,
            chatId: chat._id,
            receiverId: participant._id,
            createdAt: Date.now(),
            lastSeen: chat?.lastSeen,
            unreadCounts: chat.unreadCounts,
          });
          unreadCountsMap[chat._id] = chat.unreadCounts || 0;
        }
      });
      setChatListLoading(false);
      const chatData = Array.from(chatDataMap.values());
      setChats(chatData);
      console.log(chatData, "chekc chat dat");
    }
  };

  const createPrivateRoomId = (id1: string, id2: string) => {
    return id1 > id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
  };

  const handleCreateNewChat = async (receiverData: any, isOnline: any) => {
    if (data?._id) {
      const newRoomId = createPrivateRoomId(data?._id, receiverData._id);
      setRoomId(newRoomId);
      socket?.emit("join-room", newRoomId);
      setCurrentChat({ ...receiverData, isOnline, roomId: newRoomId });

      const response = await dispatch(
        getMessagesByChatIdAction(receiverData.chatId)
      );

      setMessages(response.payload.data);

      if (isMobileView) {
        setShowChatWindow(true);
      }
    }
  };

  const onSendMessage = async ({ content, contentType }: any) => {
    if (roomId && currentChat && data?._id) {
      const newMessage = {
        roomId,
        chatId: currentChat?.chatId,
        senderId: data?._id,
        content,
        contentType,
      };
      socket?.emit("send-message", newMessage);
      await dispatch(createMessageAction(newMessage));
    }
  };

  const handleBackClick = () => {
    setShowChatWindow(false);
  };

  useEffect(() => {
    if (peer) {
      peer.on("call", (incomingCall) => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setLocalStream(stream);
            incomingCall.answer(stream);
            incomingCall.on("stream", (remoteStream) => {
              setRemoteStream(remoteStream);
              setCallStatus("in-call");
            });
          })
          .catch((err) => {
            console.error("Failed to get local stream", err);
            setCallStatus("idle");
          });
      });
    }
  }, [peer]);

  //video call

  const onStartCall = (roomId: string) => {
    if (peer && localPeerId) {
      setCallStatus("calling");
      socket?.emit("start-call", { roomId, id: localPeerId });
      startCall(localPeerId);
    }
  };

  const startCall = (receiverId: string) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);

        const call = peer?.call(receiverId, stream);
        call?.on("stream", (remoteStream) => {
          setRemoteStream(remoteStream);
          setCallStatus("in-call");
        });
      })
      .catch((err) => {
        console.error("Failed to get local stream", err);
        setCallStatus("idle");
      });
  };

  const answerCall = (callerId: string) => {

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        const call = peer?.call(callerId, stream);
        call?.on("stream", (remoteStream) => {
          setRemoteStream(remoteStream);
          setCallStatus("in-call");
        });
      })
      .catch((err) => {
        console.error("Failed to get local stream", err);
        setCallStatus("idle");
      });
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setRemoteStream(null);
    setCallStatus("idle");
    socket?.emit("end-call", currentChat?.roomId);
  };

  return (
    <div className="flex bg-gray-900">
      {!isMobileView || !showChatWindow ? (
        <ChatSidebar
          users={chats}
          onlineUsers={onlineUsers}
          onCreateNewChat={handleCreateNewChat}
          loading={chatListLoading}
          unreadCounts={unreadCounts}
        />
      ) : null}
      {(!isMobileView || showChatWindow) && (
        <ChatWindow
          messages={messages}
          currentUser={data?._id || ""}
          onSendMessage={onSendMessage}
          currentChat={currentChat}
          typingData={typingData}
          onBack={handleBackClick}
          onStartCall={onStartCall}
          callStatus={callStatus}
        />
      )}
      {callStatus !== "idle" && (
        <VideoCall
          localStream={localStream}
          remoteStream={remoteStream}
          onEndCall={endCall}
        />
      )}
    </div>
  );
};
