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
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">
        イベント一覧
      </h2>
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
	        {/* admin のときだけ固定幅の「操作」列を表示 */}
            {userRole === "admin" && (
              <th className="border border-gray-500 px-3 py-2 w-[140px] text-center">
                操作
              </th>
            )}
	      </tr>
        </thead>
        <tbody>
          {events.map((event) => (
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
              {/* admin のときだけ「編集・削除ボタン」を表示 */}
              {userRole === "admin" && (
                <td className="border border-gray-500 px-3 py-2 w-[140px] text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(event.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      削除
                    </button>
                  </div>
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
