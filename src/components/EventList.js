// src/components/EventList.js
import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";

function EventList
  ({ 
    events,
    setEvents,
    onDelete,
    onEdit,
    onSort,
    sortConfig,
    onSelect,
    userRole
  }) {

  // 初回ロード時にデータ取得
  useEffect(() => {
   // Supabase からデータ取得
   const fetchEvents = async () => {
     const { data, error } = await supabase
       .from("Events")
       .select("*")
       .eq("flag", 1)   // 1=イベント一覧表示
       .order("date", { ascending: true });

     if (error) {
       console.error("取得エラー:", error);
     } else {
       setEvents(data);  // 親(App.js)に反映
     }
   };

    fetchEvents();
  }, [setEvents]);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">イベント一覧</h2>
      <table className="w-full border border-gray-500 border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th onClick={() => onSort("title")} className="cursor-pointer border px-3 py-2 text-left">
              イベント名{getSortIndicator("title")}
            </th>
            <th onClick={() => onSort("date")} className="cursor-pointer border px-3 py-2 text-left">
              日付{getSortIndicator("date")}
            </th>
            <th onClick={() => onSort("location")} className="cursor-pointer border px-3 py-2 text-left">
              場所{getSortIndicator("location")}
            </th>
            {/* 管理者のみ 固定幅の「操作」列表示 */}
            {userRole === "admin" && <th className="border px-3 py-2 w-[140px] text-center">操作</th>}
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">
                <span
                  onClick={() => onSelect(event)}
                  className="text-blue-600 underline cursor-pointer"
                >
                  {event.title}
                </span>
              </td>
              <td className="border px-3 py-2">{event.date}</td>
              <td className="border px-3 py-2">{event.location}</td>

              {/* 管理者のみ「編集・削除」ボタン表示(固定幅で中央寄せ) */}
              {userRole === "admin" && (
                <td className="border px-3 py-2 w-[140px] text-center">
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
