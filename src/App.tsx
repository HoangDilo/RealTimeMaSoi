import { useEffect, useRef, useState } from "react";

import { database } from "./../firebase.config";
import { ref, set, onValue, off,  } from "firebase/database";

import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMsgValue, setInputMsgValue] = useState("");

  const messageRef = useRef(ref(database, "message"));

  const handleAddMessage = () => {
    if (inputMsgValue) {
      const newArr = messages
        ? [...messages, inputMsgValue]
        : [inputMsgValue];
      set(messageRef.current, newArr).then(() => setInputMsgValue(''));
    }
  };

  console.log(messages);
  

  useEffect(() => {
    onValue(messageRef.current, (snapshot) => {
      setMessages(snapshot.val());
    });

    return () => off(messageRef.current, "value");
  }, []);


  return (
    <div className="flex flex-col gap-2 w-screen h-screen p-2">
      <div className="flex flex-col w-full gap-2 h-full">
        {messages &&
          !!messages.length &&
          messages.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="w-full border-black border-[1px] px-3 py-2"
          value={inputMsgValue}
          onChange={(event) => setInputMsgValue(event.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-3 hover:bg-blue-700"
          onClick={handleAddMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
