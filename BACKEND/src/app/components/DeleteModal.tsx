"use client";

import styles from "./DeleteModal.module.css";

export default function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.message1}>회원 탈퇴 하시겠습니까?</p>
        <div className={styles.message2Container}>
          <p className={styles.message2}>
            회원 탈퇴를 진행하시면 <br /> 계정을 복구할 수 없습니다.
          </p>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
