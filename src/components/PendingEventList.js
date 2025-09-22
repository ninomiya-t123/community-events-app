// src/components/PendingEventList.js
import React from "react";

function PendingEventList({
  events,
  onapprove,
  onreject,
  onSort,
  sortConfig,
  onSelect,
  userRole,
  accountName
}) {
  const getSortIndicator = (key) => {
    if (!sortConfig || sortConfig.key !== key) return "";
   return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  if (userRole === "admin") { 
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
            {events.length === 0 ? (
              <tr>
                <td colSpan="6">承認待ちイベントはありません</td>
              </tr>
            ) : (
              events.map((event) => (
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
                  <button onClick={() => onapprove(event.id)}>承認</button>
                  <button onClick={() => onreject(event.id)}>却下</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    // ログインしたアカウントで申請したイベントのみ表示
    const filteredEvents = events.filter(
      (e) => e.applicantName === accountName && e.status === "pending"
    );
    
    return (
      <div>
        <h2>申請中イベント一覧</h2>
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
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="5">申請中のイベントはありません</td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default PendingEventList;
