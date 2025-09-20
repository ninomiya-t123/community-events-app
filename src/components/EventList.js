// src/components/EventList.js
import React from "react";

function EventList({ events, onDelete, onEdit }) {
  return (
    <div>
      <h2>イベント一覧</h2>
      <table>
        <thead>
          <tr>
            <th>イベント名</th>
            <th>日付</th>
            <th>場所</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>
                <button onClick={() => onEdit(event.id)}>編集</button>
                <button onClick={() => onDelete(event.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;

