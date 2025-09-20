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

  // 検索用 state
  const [searchInput, setSearchInput] = useState("");
  const [searchStartDateInput, setSearchStartDateInput] = useState("");
  const [searchEndDateInput, setSearchEndDateInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

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

  // フィルタ処理（AND条件＋日付範囲）
  const filteredEvents = events.filter((event) => {
    const matchText =
      event.title.includes(searchTerm) || event.location.includes(searchTerm);

    const matchStart = searchStartDate
      ? event.date >= searchStartDate
      : true;
    const matchEnd = searchEndDate
      ? event.date <= searchEndDate
      : true;

    return matchText && matchStart && matchEnd;
  });

  // 検索処理
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setSearchStartDate(searchStartDateInput);
    setSearchEndDate(searchEndDateInput);
  };

  // リセット処理
  const handleReset = () => {
    setSearchInput("");
    setSearchStartDateInput("");
    setSearchEndDateInput("");
    setSearchTerm("");
    setSearchStartDate("");
    setSearchEndDate("");
  };


  return (
    <div>
      <h1>地域コミュニティイベント管理アプリ</h1>

      {/* 検索フォーム */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: "10px" }}>
        {/* 名前・場所検索 */}
        <div>
          <input
            type="text"
            placeholder="イベント名や場所で検索"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ padding: "5px", width: "200px", marginRight: "5px" }}
          />
        </div>

        {/* 日付範囲検索 */}
        <div style={{ marginTop: "5px" }}>
          <label>
            開始日:{" "}
            <input
              type="date"
              value={searchStartDateInput}
              onChange={(e) => setSearchStartDateInput(e.target.value)}
              style={{ padding: "5px", marginRight: "10px" }}
            />
          </label>
          <label>
            終了日:{" "}
            <input
              type="date"
              value={searchEndDateInput}
              onChange={(e) => setSearchEndDateInput(e.target.value)}
              style={{ padding: "5px" }}
            />
          </label>
        </div>

        {/* ボタン */}
        <div style={{ marginTop: "5px" }}>
          <button type="submit">検索</button>
          <button type="button" onClick={handleReset} style={{ marginLeft: "5px" }}>
            リセット
          </button>
        </div>
      </form>

      {/* 追加ボタン */}
      <button
        onClick={() => {
          setEditingEvent(null);
          setIsModalOpen(true);
        }}
      >
        ＋ イベント追加
      </button>

      {/* イベント一覧 */}
      <EventList events={filteredEvents} onDelete={deleteEvent} onEdit={editEvent} />

      {/* モーダル */}
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
