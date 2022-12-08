import React, { useRef, useState, useEffect } from "react";

const Chat = () => {
  const [msg, setmsg] = useState();
  const chatBoxRef = useRef();
  const [chatBoxHeight, setchatBoxHeight] = useState(0);
  const [Chat, setChat] = useState([
    {
      from: true,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      user: "Shayan khan",
      time: "12/8/2022, 2:40 PM",
    },
    {
      msg: "Quasi voluptatibus dolores voluptate",
      user: "Shayan khan",
      from: false,
      time: "12/8/2022, 2:45 PM",
    },
    {
      msg: "autem incidunt aliquam",
      user: "Shayan khan",
      from: true,
      time: "12/8/2022, 2:46 PM",
    },
    {
      msg: " Labore saepe vel veniam vero deserunt.",
      user: "Shayan khan",
      from: true,
      time: "12/8/2022, 2:50 PM",
    },
    {
      msg: "Quasi voluptatibus dolores voluptate",
      user: "Shayan khan",
      from: false,
      time: "12/8/2022, 2:55 PM",
    },
    {
      msg: "Quasi voluptatibus dolores voluptate",
      user: "Shayan khan",
      from: false,
      time: "12/8/2022, 2:55 PM",
    },
    {
      msg: "Quasi voluptatibus dolores voluptate",
      user: "Shayan khan",
      from: false,
      time: "12/8/2022, 2:55 PM",
    },
  ]);
  useEffect(() => {
    const chatBoxHeight = chatBoxRef.current && chatBoxRef.current.scrollHeight;
    if (chatBoxHeight < 100) {
      setchatBoxHeight(chatBoxHeight);
    }
    if (!msg) {
      setchatBoxHeight(16);
    }
  }, [msg]);
  function sendMsg(e) {
    e.preventDefault();
    console.log(msg);
    setChat([...Chat, {
      msg: msg,
      user: "Shayan khan",
      from: false,
      time: "12/8/2022, 2:55 PM",
    }]);

  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold border-b">
        Discussions
      </h1>
      <div className="chat-body ">
        <form
          onSubmit={(e) => sendMsg(e)}
          className="flex items-end border p-1 border-emerald-600"
        >
          <textarea
            style={{ minHeight: chatBoxHeight + "px" }}
            ref={chatBoxRef}
            className="textarea outline-0  flex-grow"
            onChange={(e) => setmsg(e.target.value)}
            placeholder="type here"
            value={msg}
            required
          />
          <button type="submit" className="btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
        {Chat.map((msg, i) => (
          <div
            key={i}
            className={
              msg.from
                ? "p-2 my-3 receive bg-green-300 rounded-md"
                : "p-2 my-3 send bg-purple-300 rounded-md"
            }
          >
            <h1 className="text-sm leading-8 font-semibold">
              {msg.from && msg.user}
            </h1>
            <p className="text-sm">{msg.msg}</p>
            <p className="text-sm font-sans mt-1">{msg.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
