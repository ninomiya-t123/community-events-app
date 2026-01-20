// src/components/SearchForm.js
import React from "react";

function SearchForm({
  searchInput,
  setSearchInput,
  searchStartDateInput,
  setSearchStartDateInput,
  searchEndDateInput,
  setSearchEndDateInput,
  handleSearchSubmit,
  handleReset,
}) {
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="mb-2.5 text-sm scale-90 origin-top-left"
    >
      {/* 名前・場所検索 */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="イベント名や場所で検索"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="text-sm p-1 w-[160px] mr-1 border border-gray-500 rounded focus:outline-none focus:border-gray-600"
        />
      </div>

      {/* 日付範囲検索 */}
      <div className="mt-2 border-t pt-2">
        <label className="mr-2">
          開始日:{" "}
          <input
            type="date"
            value={searchStartDateInput}
            onChange={(e) => setSearchStartDateInput(e.target.value)}
            className="text-sm p-1 w-[160px] mr-1 border border-gray-500 rounded focus:outline-none focus:border-gray-600"
          />
        </label>
        <label>
          終了日:{" "}
          <input
            type="date"
            value={searchEndDateInput}
            onChange={(e) => setSearchEndDateInput(e.target.value)}
            className="text-sm p-1 w-[160px] mr-1 border border-gray-500 rounded focus:outline-none focus:border-gray-600"
          />
        </label>
      </div>

      {/* 検索・リセットボタン */}
      <div className="mt-1.5">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-2 py-1 rounded"
        >
          検索
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="ml-1.5 bg-gray-400 hover:bg-gray-500 text-white text-sm px-2 py-1 rounded"
        >
          リセット
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
