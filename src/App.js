// src/App.js
import React, { useState } from "react";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import Modal from "./components/Modal";

function App() {
  const [events, setEvents] = useState([
    { id: 1, title: "夏祭り", date: "2025-08-01", location: "中央公園" },
    { id: 2, title: "防災訓練", date: "2025-09-15", location: "市民会館" },
    { id: 3, title: "子ども工作教室", date: "2025-10-05", location: "図書館" },
  ]);

const [editingEvent, setEditingEvent] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  // 追加処理
  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  // 削除処理
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // 編集開始
  const editEvent = (id) => {
    const event = events.find((e) => e.id === id);
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // 編集保存
  const saveEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
    setIsModalOpen(false);
  };

  // 編集キャンセル
  const cancelEdit = () => {
    setEditingEvent(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>地域コミュニティイベント管理アプリ</h1>

      {/* 追加時は editingEvent をリセット */}
      <button
        onClick={() => {
          setEditingEvent(null); // ← これがポイント！
          setIsModalOpen(true);
        }}
      >
        ＋ イベント追加
      </button>

      <EventList events={events} onDelete={deleteEvent} onEdit={editEvent} />

      {isModalOpen && (
        <Modal onClose={cancelEdit}>
          <EventForm
            onAddEvent={addEvent}
            onSaveEdit={saveEvent}
            editingEvent={editingEvent}
            onCancel={cancelEdit}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;

