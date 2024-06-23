import React from "react";
import PropTypes from "prop-types"; 

const Sidebar = ({ chats, activeChat, switchChat }) => {
  
  if (!chats || chats.length === 0) {
    return (
      <div className="sidebar">
        <h2>No Chats</h2>
        {/* Placeholder or loading state */}
      </div>
    );
  }

  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={activeChat === chat.id ? "active-chat" : ""}
            onClick={() => switchChat(chat.id)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// PropTypes for type validation
Sidebar.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  activeChat: PropTypes.number.isRequired,
  switchChat: PropTypes.func.isRequired,
};

export default Sidebar;
