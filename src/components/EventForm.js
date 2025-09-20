// src/components/EventForm.js
import React, { useState, useEffect } from "react";

function EventForm({ onAddEvent, onSaveEdit, editingEvent, onCancel }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // 編集対象がある場合は初期値をセット、ない場合はリセット
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setLocation(editingEvent.location);
    } else {
      setTitle("");
      setDate("");
      setLocation("");
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !location) return;

    if (editingEvent) {
      // 編集モード
      const updatedEvent = {
        ...editingEvent,
        title,
        date,
        location,
      };
      onSaveEdit(updatedEvent);
    } else {
      // 追加モード
      const newEvent = {
        id: Date.now(),
        title,
        date,
        location,
      };
      onAddEvent(newEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingEvent ? "イベント編集" : "イベント追加"}</h2>
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
      <button type="submit">{editingEvent ? "保存" : "追加"}</button>
      <button type="button" onClick={onCancel}>キャンセル</button>
    </form>
  );
}

export default EventForm;
