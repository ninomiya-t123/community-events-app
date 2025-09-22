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
    <form onSubmit={handleSubmit}>
      <h2>イベント申請フォーム</h2>

      <div>
        <label>イベント名: </label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label>日付: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div>
        <label>場所: </label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>

      <div>
        <label>詳細: </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label>URL（任意）: </label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>

      <div>
        <label>申請者名: </label>
        <input value={applicantName} onChange={(e) => setApplicantName(e.target.value)} required />
      </div>

      <div>
        <label>申請者メール: </label>
        <input type="email" value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)} required />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button type="submit">申請</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "5px" }}>
          キャンセル
        </button>
      </div>
    </form>
  );
}

export default EventProposalForm;
