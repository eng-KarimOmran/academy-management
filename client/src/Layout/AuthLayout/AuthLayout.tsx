import { Spinner } from "@/components/ui/spinner";
import { refresh } from "@/service/auth.service";
import { useAuthState } from "@/store/AuthState";
import type { ErrorAxios } from "@/types/axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const [loading, setLoading] = useState(true);
  const { setUser, user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await refresh();
        setUser(res.data.data);
      } catch (error) {
        const err = error as ErrorAxios;
        if (err) {
          setUser(null);
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [setUser, navigate]);

  if (loading) {
    return (
      <section className="w-full h-dvh flex justify-center items-center">
        <Spinner size={24} />
      </section>
    );
  }

  if (user) {
    return <Navigate to={"/dashboard"} replace={true} />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
}
