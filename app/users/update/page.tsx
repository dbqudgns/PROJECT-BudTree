"use client";

import { userState } from "@/app/recoil/atoms";
import { useRecoilState } from "recoil";

export default function UserUpdatePage() {
  const [user, setUser] = useRecoilState(userState);

  return (
    <div>
      <h1>Update UserPage</h1>
      <input
        type="email"
        placeholder="Enter your Email"
        value={user.email}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        type="text"
        value={user.name}
        placeholder="Name"
        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
      />
    </div>
  );
}
