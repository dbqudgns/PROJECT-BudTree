"use client";
import { Metadata } from "next";
import Link from "next/link";

// import styles from "./style.module.css";
import "./globals.css";
import Image from "next/image";

export default function StartPage() {
  return (
    <div className="container">
      <div className="StartImage">
        <Image
          className="image"
          src="/buddy.png"
          alt="buddy image"
          width={500}
          height={400}
        />
      </div>
      <div className="writing">
        <div className="title">나만의 작은 친구</div>
        <div className="content">버드 나무</div>
      </div>
      <div className="button-group">
        <Link href="/LoginPage">
          <button className="primary-button">로그인</button>
        </Link>
        <Link href="/signup">
          <button className="secondary-button">회원가입</button>
        </Link>
      </div>
    </div>
  );
}
