// src/App.js
import React, { useState } from "react";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import Modal from "./components/Modal";
import PendingEventList from "./components/PendingEventList";

function App() {

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "夏祭り",
      date: "2025-08-01",
      location: "中央公園",
      description: "地域の伝統行事として毎年開催される夏祭りです。",
      url: "https://example.com/matsuri"
    },
    {
      id: 2,
      title: "防災訓練",
      date: "2025-09-15",
      location: "市民会館",
      description: "地域住民向け防災訓練。避難経路や救急対応を学びます。",
      url: ""
    },
    {
      id: 3,
      title: "子ども工作教室",
      date: "2025-10-05",
      location: "図書館",
      description: "親子で楽しめる工作体験イベントです。",
      url: "https://example.com/kousaku"
    }
  ]);

  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 詳細表示用
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 検索用 state
  const [searchInput, setSearchInput] = useState("");
  const [searchStartDateInput, setSearchStartDateInput] = useState("");
  const [searchEndDateInput, setSearchEndDateInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

 // ソート用 state
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" });

 // 承認待ちイベント用 state
  const [pendingEvents, setPendingEvents] = useState([
  { 
    id: 101,
    title: "ヨガ教室",
    date: "2025-11-01",
    location: "公民館",
    description: "初心者向けヨガクラスを提案します！",
    url: "",
    applicantName: "山田太郎",
    applicantEmail: "taro@example.com"
  }
]);

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
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase());

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


  // ソート処理
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const { key, direction } = sortConfig;
    let comparison = 0;

    if (a[key] < b[key]) {
      comparison = -1;
    } else if (a[key] > b[key]) {
      comparison = 1;
    }

    return direction === "asc" ? comparison : -comparison;
  });

  // ソート切替関数
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // 同じ列なら昇順⇔降順を切り替え
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        // 別の列を選んだ場合は昇順でスタート
        return { key, direction: "asc" };
      }
    });
  };

  // 詳細を閉じる
  const closeDetail = () => {
    setSelectedEvent(null);
  };

  // 承認処理
  const approveEvent = (id) => {
    const eventToApprove = pendingEvents.find((e) => e.id === id);
    if (!eventToApprove) return;
    setPendingEvents(pendingEvents.filter((e) => e.id !== id));
    setEvents([...events, eventToApprove]);
  };

  // 却下処理
  const rejectEvent = (id) => {
    setPendingEvents(pendingEvents.filter((e) => e.id !== id));
  };

  // ソート処理（承認待ち用）
  const sortedPendingEvents = [...pendingEvents].sort((a, b) => {
    const { key, direction } = sortConfig;
    let comparison = 0;

    if (a[key] < b[key]) {
      comparison = -1;
    } else if (a[key] > b[key]) {
      comparison = 1;
    }

    return direction === "asc" ? comparison : -comparison;
  });

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
      <EventList
        events={sortedEvents}
        onDelete={deleteEvent}
        onEdit={editEvent}
        onSort={handleSort}
        sortConfig={sortConfig}
        onSelect={setSelectedEvent}
      />

      {/* 追加・編集モーダル */}
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

      {/* 詳細モーダル */}
      {selectedEvent && (
        <Modal onClose={closeDetail}>
          <h2>{selectedEvent.title}</h2>
          <p>
            <strong>日付:</strong> {selectedEvent.date}
          </p>
          <p>
            <strong>場所:</strong> {selectedEvent.location}
          </p>
          {selectedEvent.description && (
            <p>
              <strong>詳細:</strong> {selectedEvent.description}
            </p>
          )}
          {selectedEvent.url && (
            <p>
              <a
                href={selectedEvent.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                イベントページを見る
              </a>
            </p>
          )}
          {selectedEvent.applicantName && (
            <p>
              <strong>申請者:</strong> {selectedEvent.applicantName}
            </p>
          )}
          {selectedEvent.applicantEmail && (
            <p>
              <strong>申請者メール:</strong> {selectedEvent.applicantEmail}
            </p>
          )}
        </Modal>
      )}

      {/* 承認待ちイベント一覧 */}
      <PendingEventList
        pendingEvents={sortedPendingEvents}
        approveEvent={approveEvent}
        rejectEvent={rejectEvent}
        onSort={handleSort}
        sortConfig={sortConfig}
        onSelect={setSelectedEvent}
      />

    </div>
  );
}

export default App;
