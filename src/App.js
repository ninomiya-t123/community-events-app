// src/App.js
import React, { useState } from "react";
import Login from "./components/Login";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import DetailForm from "./components/DetailForm.js";
import SearchForm from "./components/SearchForm";
import EventProposalForm from "./components/EventProposalForm";
import Modal from "./components/Modal";
import PendingEventList from "./components/PendingEventList";
import { supabase } from "./supabaseClient";

function App() {

  // ログイン画面用 state
  const [userRole, setUserRole] = useState(null); // "admin", "user", "guest"
  const [username, setUsername] = useState("");

  // メッセージ表示用 state
  const [message, setMessage] = useState("");

  // イベント一覧用 state
  const [events, setEvents] = useState([]);

  // 追加・編集用 state
  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 詳細表示用 state
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 検索用 state
  const [searchInput, setSearchInput] = useState("");
  const [searchStartDateInput, setSearchStartDateInput] = useState("");
  const [searchEndDateInput, setSearchEndDateInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

 // ソート用 state
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" });

 // 承認待ちイベント用 state
  const [pendingEvents, setPendingEvents] = useState([]);

  // 申請中イベント用 state
  const [isProposalOpen, setIsProposalOpen] = useState(false)

  // ログイン処理
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin") {
      setUserRole("admin");
      setUsername("admin");
    } else {
      setUserRole("user");
      setUsername(username);
    }
  };
  
  // ゲストログイン処理
  const handleGuest = () => {
    setUserRole("guest");
    setUsername("guest");
  };

  // ログアウト処理
  const handleLogout = () => {
    setUserRole(null);   // ログイン状態解除
    setUsername("");     // ユーザー名クリア
    setMessage("ログアウトしました");
    
    setTimeout(() => setMessage(""), 3000);  // 数秒後に自動で消す
  };
  
  // ログイン画面表示
  if (!userRole) {  // userRoleがnullのときにログイン画面表示
    return (
      <div>
        <Login onLogin={handleLogin} onGuest={handleGuest} />
        {/* ログアウト後はメッセージ表示 */}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>
    );
  }

  // 追加処理
  const addEvent = async (newEvent) => {
    try {
      const { data, error } = await supabase.from("Events").insert([
        {
          title: newEvent.title,
          date: newEvent.date,
          location: newEvent.location,
          description: newEvent.description || "",
          url: newEvent.url || "",
          applicantName: "管理者",
          applicantEmail: "",
          applicantuserName: userRole,
          flag: newEvent.flag,
        },
      ])
      .select();
      
      console.log("insert 結果:", { data, error });

      if (error){
       console.error("追加エラー:", error);
       alert("イベントの追加に失敗しました。");
       return;
      }
      
      if (data && data.length > 0) {
        setEvents([...events, data[0]]);
      }
      
      setIsModalOpen(false);   // モーダルを閉じる
      setMessage("追加しました！");
      setTimeout(() => setMessage(""), 3000);  // 数秒後に自動で消す
      
    } catch (err) {
      console.error("追加エラー:", err);
      alert("イベントの追加に失敗しました。コンソールを確認してください。");
    }
    
  };

  // 論理削除処理
  const deleteEvent = async (id) => {
    const { error } = await supabase
      .from("Events")
      .update({ flag: 0 })
      .eq("id", id);

    if (error) console.error("削除エラー:", error);
    else setEvents(events.filter((e) => e.id !== id));
  };

  // 編集開始
  const editEvent = (id) => {
    const event = events.find((e) => e.id === id);
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // 編集保存
  const saveEvent = async (updatedEvent) => {
    const { error } = await supabase
      .from("Events")
      .update({
        title: updatedEvent.title,
        date: updatedEvent.date,
        location: updatedEvent.location,
        description: updatedEvent.description || "",
        url: updatedEvent.url || "",
      })
      .eq("id", updatedEvent.id);

    if (error) console.error("更新エラー:", error);
    else {
      setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
      setEditingEvent(null);
      setIsModalOpen(false);
    }
  };

  // 編集キャンセル
  const cancelEdit = () => {
    setEditingEvent(null);
    setIsModalOpen(false);
  };

  // フィルタ処理（AND条件＋日付範囲）
  const filteredEvents = events.filter((event) => {
  const matchText =
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStart = searchStartDate
      ? event.date >= searchStartDate
      : true;
    const matchEnd = searchEndDate
      ? event.date <= searchEndDate
      : true;

    return matchText && matchStart && matchEnd;
  });

  // 検索処理
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setSearchStartDate(searchStartDateInput);
    setSearchEndDate(searchEndDateInput);
  };

  // リセット処理
  const handleReset = () => {
    setSearchInput("");
    setSearchStartDateInput("");
    setSearchEndDateInput("");
    setSearchTerm("");
    setSearchStartDate("");
    setSearchEndDate("");
  };


  // ソート処理
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const { key, direction } = sortConfig;
    let comparison = 0;

    if (a[key] < b[key]) {
      comparison = -1;
    } else if (a[key] > b[key]) {
      comparison = 1;
    }

    return direction === "asc" ? comparison : -comparison;
  });

  // ソート切替関数
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // 同じ列なら昇順⇔降順を切り替え
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        // 別の列を選んだ場合は昇順でスタート
        return { key, direction: "asc" };
      }
    });
  };

  // 詳細を閉じる
  const closeDetail = () => {
    setSelectedEvent(null);
  };

  // 承認処理
  const approveEvent = async (id) => {
    try{
      const { data, error } = await supabase
        .from("Events")
        .update({ flag: 1 })
        .eq("id", id)
        .select();

      if (error) {
        console.error("承認エラー:", error);
        return;
      }

      // 更新結果が返ってこなければ処理中止
      if (!data || data.length === 0) return;

      // 承認待ちリストから削除
      setPendingEvents(pendingEvents.filter((e) => e.id !== id));

      // 通常イベント一覧に追加
      setEvents([...events, data[0]]);
    } catch (err) {
      console.error("承認処理中の例外:", err);
    }
  };


  // 却下処理
  const rejectEvent = async (id) => {
    const { error } = await supabase
      .from("Events")
      .update({ flag: 3 })
      .eq("id", id);

    if (error) console.error("却下エラー:", error);
    else setPendingEvents(pendingEvents.filter((e) => e.id !== id));
  };

  // ソート処理（承認待ち用）
  const sortedPendingEvents = [...pendingEvents].sort((a, b) => {
    const { key, direction } = sortConfig;
    let comparison = 0;

    if (a[key] < b[key]) {
      comparison = -1;
    } else if (a[key] > b[key]) {
      comparison = 1;
    }

    return direction === "asc" ? comparison : -comparison;
  });

  // 申請処理
  const proposeEvent = async (newEvent) => {
    try {
      const { data, error } = await supabase.from("Events").insert([
        {
          title: newEvent.title,
          date: newEvent.date,
          location: newEvent.location,
          description: newEvent.description || "",
          url: newEvent.url || "",
          applicantName: newEvent.applicantName,
          applicantEmail: newEvent.applicantEmail,
          applicantuserName: newEvent.applicantuserName,
          flag: newEvent.flag,
        },
      ])
      .select();
      
      console.log("insert 結果:", { data, error });

      if (error) {
        console.error("申請エラー:", error);
        alert("イベントの追加に失敗しました。");
        return;
      } 
      
      if (data && data.length > 0) {
        setPendingEvents([...pendingEvents, data[0]]);
      }
      
      setIsProposalOpen(false);   // モーダルを閉じる
      setMessage("申請しました！");
      setTimeout(() => setMessage(""), 3000);  // 数秒後に自動で消す
    
    } catch (err) {
      console.error("申請エラー:", err);
      alert("イベントの申請に失敗しました。コンソールを確認してください。");
    }
    
  };





  // ここからUserRoleによって表示画面を変更(1～3)
  if (userRole === "admin") {   // 1. admin 用の画面
    return (
      <div className="p-4">
        {/* ヘッダー部分 */}
        <div className="flex justify-end items-center p-4">
          <h3 className="text-lg font-semibold">{userRole} としてログイン中</h3>
          <button
            onClick={handleLogout}
            className="ml-2.5 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
          >
            ログアウト
          </button>
        </div>

        {/* 検索フォーム */}
        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchStartDateInput={searchStartDateInput}
          setSearchStartDateInput={setSearchStartDateInput}
          searchEndDateInput={searchEndDateInput}
          setSearchEndDateInput={setSearchEndDateInput}
          handleSearchSubmit={handleSearchSubmit}
          handleReset={handleReset}
        />

        {/* 追加ボタン */}
        <div className="flex justify-end items-center p-4">
          <button
            onClick={() => {
              setEditingEvent(null);
              setIsModalOpen(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            ＋ イベント追加
          </button>
        </div>

        {/* イベント一覧 */}
        <section className="mb-10">
          <EventList
            events={sortedEvents}
            setEvents={setEvents} 
            onDelete={deleteEvent}
            onEdit={editEvent}
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelect={setSelectedEvent}
            userRole={userRole}
          />
        </section>

        {/* 追加・編集モーダル */}
        {isModalOpen && (
          <Modal onClose={cancelEdit}>
            <EventForm
              onAddEvent={addEvent}
              onSaveEdit={saveEvent}
              editingEvent={editingEvent}
              onCancel={cancelEdit}
            />
          </Modal>
        )}

        {/* 詳細モーダル */}
        {selectedEvent && (
          <Modal onClose={closeDetail}>
            <DetailForm
              selectedEvent={selectedEvent}
              onClose={closeDetail}
              userRole={userRole}
            />
          </Modal>
        )}

        {/* 追加完了後のメッセージ */}
        {message && <div style={{ color: "green", marginTop: "10px" }}>{message}</div>}

        {/* 承認待ちイベント一覧 */}
        <section>
          <PendingEventList
            pendingEvents={sortedPendingEvents}
            setPendingEvents={setPendingEvents} 
            onApprove={approveEvent}
            onReject={rejectEvent}
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelect={setSelectedEvent}
            userRole={userRole}
            accountName={username}
          />
        </section>

      </div>
    );

  } else if (userRole === "user") {   // 2. user 用の画面
    return (
      <div className="p-4">
        {/* ヘッダー部分 */}
        <div className="flex justify-end items-center p-4">
          <h3 className="text-lg font-semibold">{username} としてログイン中</h3>
          <button
            onClick={handleLogout}
            className="ml-2.5 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
          >
            ログアウト
          </button>
        </div>

        {/* 検索フォーム */}
        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchStartDateInput={searchStartDateInput}
          setSearchStartDateInput={setSearchStartDateInput}
          searchEndDateInput={searchEndDateInput}
          setSearchEndDateInput={setSearchEndDateInput}
          handleSearchSubmit={handleSearchSubmit}
          handleReset={handleReset}
        />

        {/* イベント一覧 */}
        <section className="mb-10">
          <EventList
            events={sortedEvents}
            setEvents={setEvents} 
            onDelete={() => {}} // 無効化
            onEdit={() => {}} // 無効化
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelect={setSelectedEvent}
            userRole={userRole}
          />
        </section>

        {/* 詳細モーダル */}
        {selectedEvent && (
          <Modal onClose={closeDetail}>
            <DetailForm
              selectedEvent={selectedEvent}
              onClose={closeDetail}
              userRole={userRole}
            />
          </Modal>
        )}
        
        {/* 申請中イベント一覧 */}
        <section>
          <PendingEventList
            pendingEvents={sortedPendingEvents}
            setPendingEvents={setPendingEvents} 
            onApprove={approveEvent}
            onReject={rejectEvent}
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelect={setSelectedEvent}
            userRole={userRole}
            accountName={username}
          />
        </section>

        {/* 申請ボタン */}
        <button
          onClick={() => setIsProposalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          ＋ イベント申請
        </button>

        {/* 申請モーダル */}
        {isProposalOpen && (
          <Modal onClose={() => setIsProposalOpen(false)}>
            <EventProposalForm
              onSubmit={proposeEvent}
              onCancel={() => setIsProposalOpen(false)}
            />
          </Modal>
        )}

        {/* 申請完了後のメッセージ */}
        {message && <div style={{ color: "green", marginTop: "10px" }}>{message}</div>}

      </div>
    );
  } else {   // 3. guest 用の画面
    return (
      <div className="p-4">
        {/* ヘッダー部分 */}
        <div className="flex justify-end items-center p-4">        <h3 className="text-lg font-semibold">{userRole} としてログイン中</h3>
          <button
            onClick={handleLogout}
            className="ml-2.5 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
          >
            ログアウト
          </button>
        </div>

        {/* 検索フォーム */}
        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchStartDateInput={searchStartDateInput}
          setSearchStartDateInput={setSearchStartDateInput}
          searchEndDateInput={searchEndDateInput}
          setSearchEndDateInput={setSearchEndDateInput}
          handleSearchSubmit={handleSearchSubmit}
          handleReset={handleReset}
        />

        {/* イベント一覧 */}
        <section className="mb-10">
          <EventList
            events={sortedEvents}
            setEvents={setEvents} 
            onDelete={() => {}} // 無効化
            onEdit={() => {}} // 無効化
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelect={setSelectedEvent}
            userRole={userRole}
          />
        </section>

        {/* 詳細モーダル */}
        {selectedEvent && (
          <Modal onClose={closeDetail}>
            <DetailForm
              selectedEvent={selectedEvent}
              onClose={closeDetail}
              userRole={userRole}
            />
          </Modal>
        )}
        
      </div>
    );
  }

}

export default App;
