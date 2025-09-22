import React, { useState } from "react";

function Login({ onLogin, onGuest }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password); // 親(App.js)にログイン情報を渡す
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>地域コミュニティイベント管理アプリ</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="アカウント名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "8px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", width: "200px" }}
          />
        </div>
        <div>
          <button type="submit" style={{ padding: "8px 16px", marginRight: "10px" }}>
            ログイン
          </button>
          <button
            type="button"
            onClick={onGuest}
            style={{ padding: "8px 16px" }}
          >
            アカウントなしで続ける
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
