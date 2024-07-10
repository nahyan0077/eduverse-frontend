import React, { useEffect, useRef, useState } from "react";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
  IoCallOutline,
} from "react-icons/io5";

interface VideoCallProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  onEndCall: () => void;
}

export const VideoCall: React.FC<VideoCallProps> = ({
  localStream,
  remoteStream,
  onEndCall,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col justify-between p-4">
        <div className="relative flex-grow overflow-hidden rounded-lg shadow-lg">
          {remoteStream ? (
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white text-2xl">
              Waiting for remote stream...
            </div>
          )}
          {localStream && (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="absolute bottom-4 right-4 w-1/4 max-w-[200px] aspect-video object-cover rounded-lg border-2 border-white shadow-md"
            />
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-6">
            <button
              onClick={toggleMute}
              className={`p-4 rounded-full ${
                isMuted ? "bg-red-500" : "bg-gray-700"
              } hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isMuted ? <IoMicOffOutline size={24} color="white" /> : <IoMicOutline size={24} color="white" />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full ${
                isVideoOff ? "bg-red-500" : "bg-gray-700"
              } hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isVideoOff ? (
                <IoVideocamOffOutline size={24} color="white" />
              ) : (
                <IoVideocamOutline size={24} color="white" />
              )}
            </button>
            <button
              onClick={onEndCall}
              className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <IoCallOutline size={24} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};