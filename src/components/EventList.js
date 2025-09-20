// src/components/EventList.js
import React from "react";

function EventList() {
  // ダミーデータ
  const events = [
    { id: 1, title: "夏祭り", date: "2025-08-01", location: "中央公園" },
    { id: 2, title: "防災訓練", date: "2025-09-15", location: "市民会館" },
    { id: 3, title: "子ども工作教室", date: "2025-10-05", location: "図書館" },
  ];

  return (
    <div>
      <h2>イベント一覧</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.date} @ {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
