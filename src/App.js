// src/App.js
import React, { useState } from "react";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";

function App() {
  const [events, setEvents] = useState([
    { id: 1, title: "夏祭り", date: "2025-08-01", location: "中央公園" },
    { id: 2, title: "防災訓練", date: "2025-09-15", location: "市民会館" },
    { id: 3, title: "子ども工作教室", date: "2025-10-05", location: "図書館" },
  ]);

  // 追加処理
  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  // 削除処理
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // 編集処理（後で実装予定）
  const editEvent = (id) => {
    alert(`イベントID: ${id} の編集処理をここに実装します`);
  };

  return (
    <div>
      <h1>地域コミュニティイベント管理アプリ</h1>
      <EventForm onAddEvent={addEvent} />
      <EventList events={events} onDelete={deleteEvent} onEdit={editEvent} />
    </div>
  );
}

export default App;
