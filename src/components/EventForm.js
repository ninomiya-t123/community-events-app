// src/components/EventForm.js
import React, { useState, useEffect } from "react";

function EventForm({ onAddEvent, onSaveEdit, editingEvent, onCancel }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [flag, setFlag] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("フォーム送信前", { title, date, location, description });
    if (!title || !date || !location || !description) return;

    const newEvent = {
      title,
      date,
      location,
      description: description || "",
      url: url || "",
      applicantName: "",
      applicantEmail: "",
      applicantuserName: "",
      flag: 1,                // 表示用
    };

    try {
      if (editingEvent) {
        await onSaveEdit({ ...editingEvent, ...newEvent });
      } else {
        await onAddEvent(newEvent);
      }
    } catch (err) {
      console.error("フォーム送信エラー:", err);
      alert("イベントの送信に失敗しました。コンソールを確認してください。");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-2">
        {editingEvent ? "イベント編集" : "イベント追加"}
      </h2>

      <div>
        <input
          type="text"
          placeholder="イベント名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-500 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border border-gray-500 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="場所"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="border border-gray-500 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <textarea
          placeholder="イベント詳細"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{ width: "100%" }}
          className="border border-gray-500 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <input
          type="url"
          placeholder="イベントURL（任意）"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-500 rounded px-3 py-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
      >
        {editingEvent ? "保存" : "追加"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
      >
        キャンセル
      </button>
    </form>
  );
}

export default EventForm;
