import { useEffect, useRef, useState } from "react";

import { database } from "./../firebase.config";
import { ref, set, onValue, off } from "firebase/database";

import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMsgValue, setInputMsgValue] = useState("");

  const bottomViewRef = useRef<HTMLDivElement>(null);

  const messageRef = useRef(ref(database, "message"));

  const handleAddMessage = () => {
    if (inputMsgValue) {
      const newArr = messages ? [...messages, inputMsgValue] : [inputMsgValue];
      set(messageRef.current, newArr).then(() => {
        setInputMsgValue("");
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddMessage();
    }
  };

  useEffect(() => {
    onValue(messageRef.current, (snapshot) => {
      setMessages(snapshot.val());
    });

    return () => off(messageRef.current, "value");
  }, []);

  useEffect(() => {
    bottomViewRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="main-screen flex flex-col gap-4 w-screen h-screen p-4">
      <div className="chat-container flex flex-col w-full gap-2 max-h-full overflow-auto">
        {messages &&
          !!messages.length &&
          messages.map((msg, index) => (
            <p key={index} className="message px-4 mx-2 py-2">
              {msg}
            </p>
          ))}
        <div ref={bottomViewRef}></div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="input-field w-full border-black border-[1px] px-4 py-2 rounded-full"
          value={inputMsgValue}
          onChange={(event) => setInputMsgValue(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
        />
        <button
          className="bg-blue-600 text-white px-3 hover:bg-blue-700 rounded-full"
          onClick={handleAddMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
