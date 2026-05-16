import { useState } from "react";
import { supabase } from "../supabaseClient.ts";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return <p>Authentication Time!</p>;
}
