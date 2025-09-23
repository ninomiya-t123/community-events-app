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
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">承認待ちイベント一覧</h2>
        <table className="w-full border border-gray-500 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th
                onClick={() => onSort("title")}
                className="cursor-pointer border border-gray-500 px-3 py-2 text-left"
              >
                イベント名{getSortIndicator("title")}
              </th>
              <th
                onClick={() => onSort("date")}
                className="cursor-pointer border border-gray-500 px-3 py-2 text-left"
              >
                日付{getSortIndicator("date")}
              </th>
              <th
                onClick={() => onSort("location")}
                className="cursor-pointer border border-gray-500 px-3 py-2 text-left"
              >
                場所{getSortIndicator("location")}
              </th>
              <th className="border border-gray-500 px-3 py-2">申請者名</th>
              <th className="border border-gray-500 px-3 py-2">申請者メール</th>
              {/* 固定幅の操作列 */}
              <th className="border border-gray-500 px-3 py-2 w-[140px] text-center">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="6" className="border border-gray-500 px-3 py-2 text-center">
                  承認待ちイベントはありません
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="border border-gray-500 px-3 py-2">
                    <span
                      onClick={() => onSelect(event)}
                      className="text-blue-600 underline cursor-pointer"
                    >
                      {event.title}
                    </span>
                  </td>
                  <td className="border border-gray-500 px-3 py-2">{event.date}</td>
                  <td className="border border-gray-500 px-3 py-2">{event.location}</td>
                  <td className="border border-gray-500 px-3 py-2">{event.applicantName}</td>
                  <td className="border border-gray-500 px-3 py-2">{event.applicantEmail}</td>
                   {/* 固定幅で中央寄せ */}
                  <td className="border border-gray-500 px-3 py-2 w-[140px] text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onapprove(event.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        承認
                      </button>
                      <button
                        onClick={() => onreject(event.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        却下
                      </button>
                    </div>
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
      (e) => e.applicantuserName === accountName && e.status === "pending"
    );

    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">申請中イベント一覧</h2>
        <table className="w-full border border-gray-500 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th
                onClick={() => onSort("title")}
                className="cursor-pointer border border-gray-500 px-3 py-2 text-left"
              >
                イベント名{getSortIndicator("title")}
              </th>
              <th
                onClick={() => onSort("date")}
                className="cursor-pointer border border-gray-500 px-3 py-2 text-left"
              >
                日付{getSortIndicator("date")}
              </th>
              <th
                onClick={() => onSort("location")}
                className="cursor-pointer border border-gray-500 px-3 py-2 text-left"
              >
                場所{getSortIndicator("location")}
              </th>
              <th className="border border-gray-500 px-3 py-2">申請者名</th>
              <th className="border border-gray-500 px-3 py-2">申請者メール</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="5" className="border border-gray-500 px-3 py-2 text-center">
                  申請中のイベントはありません
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="border border-gray-500 px-3 py-2">
                    <span
                      onClick={() => onSelect(event)}
                      className="text-blue-600 underline cursor-pointer"
                    >
                      {event.title}
                    </span>
                  </td>
                  <td className="border border-gray-500 px-3 py-2">{event.date}</td>
                  <td className="border border-gray-500 px-3 py-2">{event.location}</td>
                  <td className="border border-gray-500 px-3 py-2">{event.applicantName}</td>
                  <td className="border border-gray-500 px-3 py-2">{event.applicantEmail}</td>
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
