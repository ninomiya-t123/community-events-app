// src/components/DetailForm.js
import React from "react";

function DetailForm({ selectedEvent, onClose, userRole }) {
  if (!selectedEvent) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>

      <p>
        <span className="font-semibold">日付:</span> {selectedEvent.date}
      </p>
      <p>
        <span className="font-semibold">場所:</span> {selectedEvent.location}
      </p>

      {selectedEvent.description && (
        <p>
          <span className="font-semibold">詳細:</span>{" "}
          {selectedEvent.description}
        </p>
      )}

      {selectedEvent.url && (
        <p>
          <a
            href={selectedEvent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            イベントページを見る
          </a>
        </p>
      )}

      {/* 管理者のみ「申請者・申請者メール」表示 */}
      {userRole === "admin" && selectedEvent.applicantName && (
        <p>
          <span className="font-semibold">申請者:</span>{" "}
          {selectedEvent.applicantName}
        </p>
      )}

      {userRole === "admin" && selectedEvent.applicantEmail && (
        <p>
          <span className="font-semibold">申請者メール:</span>{" "}
          {selectedEvent.applicantEmail}
        </p>
      )}
      
    </div>
  );
}

export default DetailForm;
