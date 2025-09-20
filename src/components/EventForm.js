// src/components/EventForm.js
import React, { useState, useEffect } from "react";

function EventForm({ onAddEvent, onSaveEdit, editingEvent, onCancel }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  // 編集時に既存データを反映
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setLocation(editingEvent.location);
      setDescription(editingEvent.description || "");
      setUrl(editingEvent.url || "");
    } else {
      setTitle("");
      setDate("");
      setLocation("");
      setDescription("");
      setUrl("");
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !location) return;

    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      title,
      date,
      location,
      description,
      url, // URLは空欄でもOK
    };

    if (editingEvent) {
      onSaveEdit(newEvent);
    } else {
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
          required
        />
      </div>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="場所"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <textarea
          placeholder="イベント詳細"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <input
          type="url"
          placeholder="イベントURL（任意）"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <button type="submit">{editingEvent ? "保存" : "追加"}</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "5px" }}>
        キャンセル
      </button>
    </form>
  );
}

export default EventForm;
