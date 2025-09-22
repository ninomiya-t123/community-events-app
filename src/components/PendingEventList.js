// src/components/PendingEventList.js
import React from "react";

function PendingEventList({
  pendingEvents,
  approveEvent,
  rejectEvent,
  onSort,
  sortConfig,
  onSelect
}) {
  const getSortIndicator = (key) => {
    if (!sortConfig || sortConfig.key !== key) return "";
   return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };


  return (
    <div>
      <h2>承認待ちイベント一覧</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ marginTop: "10px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th onClick={() => onSort("title")} style={{ cursor: "pointer" }}>
              イベント名{getSortIndicator("title")}
            </th>
            <th onClick={() => onSort("date")} style={{ cursor: "pointer" }}>
              日付{getSortIndicator("date")}
            </th>
            <th onClick={() => onSort("location")} style={{ cursor: "pointer" }}>
              場所{getSortIndicator("location")}
            </th>
            <th>申請者名</th>
            <th>申請者メール</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {pendingEvents.length === 0 ? (
            <tr>
              <td colSpan="6">承認待ちイベントはありません</td>
            </tr>
          ) : (
            pendingEvents.map((event) => (
              <tr key={event.id}>
                <td>
                  <span
                    onClick={() => onSelect(event)}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {event.title}
                  </span>
                </td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.applicantName}</td>
                <td>{event.applicantEmail}</td>
                <td>
                  <button onClick={() => approveEvent(event.id)}>承認</button>
                  <button onClick={() => rejectEvent(event.id)}>却下</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PendingEventList;
