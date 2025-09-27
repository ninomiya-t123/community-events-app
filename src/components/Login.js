import React, { useState } from "react";

function Login({ onLogin, onGuest }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password); // 親(App.js)にログイン情報を渡す
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 to-yellow-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          地域コミュニティイベント管理アプリ ★☆dev★☆
        </h1>
        <h2 className="text-1.5xl font-bold mb-2.5 text-gray-700">
          ログイン
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">アカウント名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
          >
            ログイン
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={onGuest}
            className="text-sm text-orange-700 hover:underline"
          >
            アカウントなしで続ける
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
