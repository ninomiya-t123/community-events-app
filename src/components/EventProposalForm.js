import React, { useState } from "react";

function EventProposalForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProposal = {
      id: Date.now(),
      title,
      date,
      location,
      description,
      url,
      applicantName,
      applicantEmail,
    };
    onSubmit(newProposal);
    
    
    // 入力値リセット
    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");
    setUrl("");
    setApplicantName("");
    setApplicantEmail("");

    // フォームを閉じる
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-lg font-semibold mb-2">イベント申請フォーム</h2>

      <div>
        <input
          type="text"
          placeholder="イベント名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-500 rounded p-2 w-full"
        />
      </div>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border border-gray-500 rounded p-2 w-full"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="場所"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="border border-gray-500 rounded p-2 w-full"
        />
      </div>

      <div>
        <textarea
          placeholder="イベント詳細"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="border border-gray-500 rounded p-2 w-full"
        />
      </div>

      <div>
        <input
          type="url"
          placeholder="イベントURL（任意）"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-500 rounded p-2 w-full"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="申請者名"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
          required
          className="border border-gray-500 rounded p-2 w-full"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="申請者メール"
          value={applicantEmail}
          onChange={(e) => setApplicantEmail(e.target.value)}
          required
          className="border border-gray-500 rounded p-2 w-full"
        />
      </div>

      <div className="mt-3">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
        >
          申請
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}

export default EventProposalForm;