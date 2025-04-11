"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import "./DiaryHistory.css";
import { useRouter } from "next/navigation";

export default function DiaryHistory() {
  const router = useRouter();

  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState("연도");
  const [selectedMonth, setSelectedMonth] = useState("월");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },(_, index) => (2020 + index).toString()
  );
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowYearDropdown(false);
        setShowMonthDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  return (
    <div className="diary-container" ref={dropdownRef}>
      {/* Header */}
      <div className="diary-header">
      <button
        className="backButton"
        aria-label="뒤로가기"
        onClick={() => router.push("/mypage")}
      >
        <ChevronLeft className="backIcon" />
      </button>
        <h1 className="header-title">일기 내역</h1>
        <div className="header-space" />
      </div>

      {/* Year & Month Selector */}
      <div className="selector-container">
        {/* Year Selector */}
        <div className="dropdown-wrapper">
          <button
            className={`selector-button ${
              showYearDropdown ? "active" : ""
            }`}
            onClick={() => {
              setShowYearDropdown(!showYearDropdown);
              setShowMonthDropdown(false);
            }}
          >
            {selectedYear}{" "}
            {showYearDropdown ? (
              <ChevronUp className="selector-icon" />
            ) : (
              <ChevronDown className="selector-icon" />
            )}
          </button>
          {showYearDropdown && (
            <div className="dropdown">
              {years.map((year) => (
                <div
                  key={year}
                  className={`dropdown-item ${
                    selectedYear === year ? "selected" : ""
                  }`}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Month Selector */}
        <div className="dropdown-wrapper">
          <button
            className={`selector-button ${
              showMonthDropdown ? "active" : ""
            }`}
            onClick={() => {
              setShowMonthDropdown(!showMonthDropdown);
              setShowYearDropdown(false);
            }}
          >
            {selectedMonth}{" "}
            {showMonthDropdown ? (
              <ChevronUp className="selector-icon" />
            ) : (
              <ChevronDown className="selector-icon" />
            )}
          </button>
          {showMonthDropdown && (
            <div className="dropdown">
              {months.map((month) => (
                <div
                  key={month}
                  className={`dropdown-item ${
                    selectedMonth === month ? "selected" : ""
                  }`}
                  onClick={() => handleMonthSelect(month)}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Diary List */}
      <div className="diary-list-container">
        <h2 className="diary-list-title">2025년 3월</h2>
        {[1, 2].map((item) => (
          <div key={item} className="diary-item">
            <div className="diary-item-left">
              <img src="/1.png" alt="peach" className="diary-item-image" />
              <div className="diary-item-text">
                <p className="diary-item-date">2025/03/20</p>
                <p className="diary-item-status">완전 좋음</p>
              </div>
            </div>
            <button className="diary-change-button">변경</button>
          </div>
        ))}
      </div>

      {/* Scroll to top button */}
      <button className="scroll-top-button">
        <ChevronUp className="scroll-top-icon" />
      </button>
    </div>
  );
}
