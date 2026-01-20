// src/components/PendingEventList.js
//import React, { useEffect, useState } from "react";
import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";

function PendingEventList
  ({
    pendingEvents,
    setPendingEvents,
    onApprove,
    onReject,
    onSort,
    sortConfig,
    onSelect,
    userRole,
    accountName
  }) 
{

  // 初回ロード時にデータ取得
  useEffect(() => {
    // Supabase からデータ取得
    const fetchEvents = async () => {
      try {
        // ベースクエリ作成
        let query = supabase
          .from("Events")
          .select("*")
          .eq("flag", 2); // 2 = 承認前イベント

        // 管理者でない場合のみ、自分の申請したイベントのみ取得
        if (userRole !== "admin") {
          query = query.eq("applicantuserName", accountName);
        }

        // 並び替え
        query = query.order("date", { ascending: true });

        const { data, error } = await query;

        if (error) {
          console.error("取得エラー:", error);
        } else {
          setPendingEvents(data);  // 親(App.js)に反映
        }
      } catch (err) {
        console.error("fetchEvents 実行時の例外:", err);
      }
    };

    fetchEvents();
  }, [setPendingEvents, accountName, userRole]);


/*
    const { data, error } = await supabase
      .from("Events")
      .select("*")
      .eq("flag", 2)   // 2=承認前イベント
      
      // 管理者でない場合のみ、自分の申請したイベントのみ取得
      if (userRole !=== "admin") {
        .eq("applicantuserName", accountName)
      } 
      .order("date", { ascending: true });

    if (error) {
      console.error("取得エラー:", error);
    } else {
      setPendingEvents(data);  // 親(App.js)に反映
    }
  };
*/

  const getSortIndicator = (key) => {
    if (!sortConfig || sortConfig.key !== key) return "";
   return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">
        {userRole === "admin" ? "承認待ちイベント一覧" : "申請中イベント一覧"}
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
            <th className="border border-gray-500 px-3 py-2">申請者名</th>
            <th className="border border-gray-500 px-3 py-2">申請者メール</th>
            
            {/* 管理者のみ 固定幅の「操作」列表示 */}
            {userRole === "admin" && <th className="border border-gray-500 px-3 py-2 w-[140px] text-center">操作</th>}
          </tr>
        </thead>
        
        <tbody>
          {pendingEvents.length === 0 ? (
            <tr>
              <td colSpan="6" className="border border-gray-500 px-3 py-2 text-center">
                承認待ちイベントはありません
              </td>
            </tr>
          ) : (
            pendingEvents.map((event) => (
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
                
                
                {/* 管理者のみ「承認・却下」ボタン表示(固定幅で中央寄せ) */}{/*  */}
                {userRole === "admin" && (
                  <td className="border border-gray-500 px-3 py-2 w-[140px] text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onApprove(event.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        承認
                      </button>
                      <button
                        onClick={() => onReject(event.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        却下
                      </button>
                    </div>
                  </td>
                )}
                  
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
export default PendingEventList;
