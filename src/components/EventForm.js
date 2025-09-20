// src/components/EventForm.js
import React, { useState } from "react";

function EventForm({ onAddEvent }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !location) return;

    // 新しいイベントオブジェクトを作成
    const newEvent = {
      id: Date.now(),
      title,
      date,
      location,
    };

    onAddEvent(newEvent);

    // フォームをリセット
    setTitle("");
    setDate("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>イベント追加</h2>
      <div>
        <input
          type="text"
          placeholder="イベント名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="場所"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button type="submit">追加</button>
    </form>
  );
}

export default EventForm;
