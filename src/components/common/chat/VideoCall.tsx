import React, { useState, useEffect, useRef, useContext } from "react";
import { IoMicOffOutline, IoMicOutline, IoVideocamOffOutline, IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import Peer from 'peerjs';
import { SocketContext } from "@/context/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const VideoCall: React.FC = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [callState, setCallState] = useState<'initializing' | 'calling' | 'ringing' | 'active' | 'ended'>('initializing');
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerInstance = useRef<Peer | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [localPeerId, setLocalPeerId] = useState<string>("");
    const [remotePeerId, setRemotePeerId] = useState<string>("");
    const { socket } = useContext(SocketContext) || {};
    const { roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const initializePeer = async () => {
            try {
                const peer = new Peer();
                peerInstance.current = peer;

                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                peer.on("open", (id) => {
                    setLocalPeerId(id);
                    console.log(id,"user peer id---->");
                    
                    socket?.emit("start-call", { roomId, id });
                    setCallState('calling');
                });

                peer.on("call", handleIncomingCall);

                socket?.on("incoming-call", handleIncomingCallNotification);

            } catch (error) {
                console.error("Error initializing peer:", error);
                toast.error("Failed to initialize call. Please check your camera and microphone permissions.");
                setCallState('ended');
            }
        };

        initializePeer();

        return () => {
            localStream?.getTracks().forEach(track => track.stop());
            peerInstance.current?.destroy();
        };
    }, [roomId, socket]);

    const handleIncomingCall = (call: any) => {
        console.log("local peer id",localPeerId);
        
        setCallState('ringing');
        if (window.confirm("Incoming call. Accept?")) {
            call.answer(localStream!);
            call.on("stream", (incomingStream: any) => {
                setRemoteStream(incomingStream);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = incomingStream;
                }
                setCallState('active');
            });
            call.on("close", () => setCallState('ended'));
        } else {
            setCallState('ended');
        }
    };

    const handleIncomingCallNotification = (userId: string) => {
        console.log("caller notifcation",userId,"local id----.",localPeerId);
        if (userId !== localPeerId) {
            setRemotePeerId(userId);  
        }
    };

    useEffect(() => {
        if (callState === 'calling' && remotePeerId) {
            initiateCall(remotePeerId);
        }
    }, [callState, remotePeerId]);

    const initiateCall = (peerId: string) => {
        if (peerInstance.current && localStream) {
            const call = peerInstance.current.call(peerId, localStream);
            call.on("stream", (remoteVideoStream) => {
                setRemoteStream(remoteVideoStream);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteVideoStream;
                }
                setCallState('active');
            });
            call.on("close", () => setCallState('ended'));
        }
    };

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
            setIsVideoOff(!isVideoOff);
        }
    };

    const endCall = () => {
        peerInstance.current?.destroy();
        setCallState('ended');
        navigate('/');
    };

    const renderCallUI = () => {
        switch (callState) {
            case 'initializing':
                return <div className="text-center text-white text-2xl">Initializing call...</div>;
            case 'calling':
                return <div className="text-center text-white text-2xl">Calling...</div>;
            case 'ringing':
                return <div className="text-center text-white text-2xl">Incoming call...</div>;
            case 'active':
                return (
                    <>
                        <video
                            ref={remoteVideoRef}
                            className="w-full h-full object-cover"
                            autoPlay
                            playsInline
                        />
                        <div className="absolute bottom-4 right-4 w-1/4 max-w-xs">
                            <video
                                ref={localVideoRef}
                                className="w-full rounded-lg shadow-lg"
                                autoPlay
                                playsInline
                                muted
                            />
                        </div>
                    </>
                );
            case 'ended':
                return <div className="text-center text-white text-2xl">Call ended</div>;
        }
    };

    return (
        <div className="relative h-screen bg-gray-900 flex items-center justify-center">
            {renderCallUI()}

            {callState === 'active' && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 bg-gradient-to-t from-black to-transparent">
                    <div className="flex space-x-4">
                        <button
                            onClick={toggleMute}
                            className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} hover:bg-opacity-80 transition-colors`}
                        >
                            {isMuted ? <IoMicOffOutline size={24} /> : <IoMicOutline size={24} />}
                        </button>
                        <button
                            onClick={toggleVideo}
                            className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'} hover:bg-opacity-80 transition-colors`}
                        >
                            {isVideoOff ? <IoVideocamOffOutline size={24} /> : <IoVideocamOutline size={24} />}
                        </button>
                        <button
                            onClick={endCall}
                            className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                        >
                            <IoCallOutline size={24} />
                        </button>
                    </div>
                </div>
            )}

            {callState !== 'active' && (
                <button
                    onClick={endCall}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                >
                    <IoCallOutline size={24} />
                </button>
            )}
        </div>
    );
};
