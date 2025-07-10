import React, { useEffect, useState } from "react";
import Client from "./client/Client";
import Admin from "./admin/admin";

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserRole(null);
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setUserRole(data.role); // نفترض أن API يعيد { role: "admin" | "client" }
        setLoading(false);
      })
      .catch(() => {
        setUserRole(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userRole === "client") {
    return <Client />;
  }

  if (userRole === "admin") {
    return <Admin />;
  }

  // في حالة لم يتم التعرّف على الدور أو غير موجود
  return <Client />;
}
