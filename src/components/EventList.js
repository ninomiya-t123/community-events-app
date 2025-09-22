// src/components/EventList.js
import React from "react";

function EventList({
  events,
  onDelete,
  onEdit,
  onSort,
  sortConfig,
  onSelect,
  userRole
}) {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div>
      <h2>イベント一覧</h2>
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
	        {/* admin のときだけ「操作」列を表示 */}
            {userRole === "admin" && <th>操作</th>}
	  </tr>
        </thead>
        <tbody>
          {events.map((event) => (
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
              {/* admin のときだけ「編集・削除ボタン」を表示 */}
              {userRole === "admin" && (
                <td>
                  <button onClick={() => onEdit(event.id)}>編集</button>
                  <button onClick={() => onDelete(event.id)}>削除</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default EventList;
