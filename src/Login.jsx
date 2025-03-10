import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  "https://gpkftyapxtztltvehqbb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwa2Z0eWFweHR6dGx0dmVocWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MTkzNjQsImV4cCI6MjA1NjM5NTM2NH0.PgVExJyOvSmz3eIgLAmDqyKSU5LQauoFFiB_HJz5h6M"
);

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState(null);

  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    console.log(data);
  }
  getSession();

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);

    if (event === "SIGNED_IN") {
      setIsLogin(true);
      setUser(session.user.user_metadata.name);
    }
    if (event === "SIGNED_OUT") {
      setIsLogin(false);
    }
  });

  async function handleSignup() {
    const name = prompt("İsim giriniz");
    const email = prompt("Email giriniz");
    const password = prompt("Şifre giriniz");
    const options = {
      data: { name },
    };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });
    console.log(data);
    console.log(error);
  }

  async function handleLogin() {
    const email = prompt("Email giriniz");
    const password = prompt("Şifre giriniz");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, error);
  }

  return (
    <div>
      <button onClick={handleLogin}>Giriş yap</button>
      <button onClick={handleSignup}>Kayıt Ol</button>
    </div>
  );
}
