// components/Contact.js
import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, content });
    setName("");
    setContent("");
  };

  return (
    <div className="contact-container default-page">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            style={{ display: "block", marginBottom: "30px", marginTop: "10px" }}
          />
        </label>
        <label>
          Contact:
          <textarea
            value={content}
            onChange={handleContentChange}
            style={{ display: "block", marginBottom: "30px", marginTop: "10px", width: "80%", height: "40px" }}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
