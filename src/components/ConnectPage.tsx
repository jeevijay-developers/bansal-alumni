import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Users, Loader2, Lock } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { AlumniRegistration } from "../types/alumni";
import type { Session } from "@supabase/supabase-js";
import AlumniDirectory from "./AlumniDirectory";

interface ConnectPageProps {
  onNavigateToHome: () => void;
  onNavigateToRegister: () => void;
}

export default function ConnectPage({
  onNavigateToHome,
  onNavigateToRegister,
}: ConnectPageProps) {
  const [alumni, setAlumni] = useState<AlumniRegistration[]>([]);
  const [directoryLoading, setDirectoryLoading] = useState(false);
  const [directoryError, setDirectoryError] = useState<string | null>(null);

  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);

  const verifyUser = useCallback(async (userEmail: string) => {
    setCheckingVerification(true);
    setAuthError(null);
    try {
      const { data, error } = await supabase
        .from("alumni_registrations")
        .select("verified")
        .eq("email", userEmail)
        .maybeSingle();

      if (error) throw error;

      if (!data || !data.verified) {
        setIsVerifiedUser(false);
        setAuthError(
          "Your registration isn't verified yet. Please wait for admin approval."
        );
      } else {
        setIsVerifiedUser(true);
        setAuthError(null);
      }
    } catch (err) {
      setIsVerifiedUser(false);
      setAuthError(
        err instanceof Error
          ? err.message
          : "Unable to verify your alumni status right now."
      );
    } finally {
      setCheckingVerification(false);
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;
      setSession(session);
      if (session?.user?.email) {
        verifyUser(session.user.email);
      } else {
        setAuthLoading(false);
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      if (newSession?.user?.email) {
        verifyUser(newSession.user.email);
      } else {
        setIsVerifiedUser(false);
        setAuthLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [verifyUser]);

  const fetchVerifiedAlumni = useCallback(async () => {
    setDirectoryLoading(true);
    setDirectoryError(null);
    try {
      const { data, error } = await supabase
        .from("alumni_registrations")
        .select("*")
        .eq("verified", true)
        .order("full_name", { ascending: true });

      if (error) throw error;
      setAlumni(data || []);
    } catch (err) {
      setDirectoryError(
        err instanceof Error
          ? err.message
          : "Failed to load verified alumni list"
      );
    } finally {
      setDirectoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isVerifiedUser) {
      setAlumni([]);
      return;
    }
    fetchVerifiedAlumni();
  }, [isVerifiedUser, fetchVerifiedAlumni]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });

    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsVerifiedUser(false);
    setAlumni([]);
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="BANSAL CLASSES Logo"
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="text-xs uppercase tracking-wide text-primary-600">
                Bansal Alumni Association
              </p>
              <h1 className="text-xl font-bold text-primary-900">
                Connect With Friends
              </h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onNavigateToHome}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={onNavigateToRegister}
              className="inline-flex items-center space-x-2 bg-primary-700 text-primary-50 px-5 py-2 rounded-lg hover:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Register Now</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-primary-700 text-primary-50 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 text-sm font-semibold">
              <Users className="w-4 h-4" />
              <span>Verified Alumni Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Discover & Reconnect With BANSALites
            </h2>
            <p className="text-lg text-primary-100">
              Browse the ever-growing list of verified alumni, find batchmates,
              and rebuild the bonds that made your BANSAL journey special.
              Contact details remain private for everyone's safety; reach out
              through your existing channels once you reconnect here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onNavigateToRegister}
                className="inline-flex items-center justify-center space-x-2 bg-white text-primary-800 px-6 py-3 rounded-lg font-semibold hover:bg-primary-100 transition-colors duration-300"
              >
                <span>Not Verified Yet? Register</span>
              </button>
              <button
                onClick={onNavigateToHome}
                className="inline-flex items-center justify-center space-x-2 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {!session ? (
              <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6 space-y-2">
                  <div className="w-16 h-16 mx-auto bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900">
                    Sign in to continue
                  </h3>
                  <p className="text-gray-600">
                    Use the same email and password you registered with to
                    explore the alumni network.
                  </p>
                </div>
                {authError && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {authError}
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-primary-700 text-white py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {authLoading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              </div>
            ) : !isVerifiedUser ? (
              <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold">
                  <Lock className="w-4 h-4" />
                  <span>Verification Pending</span>
                </div>
                <h3 className="text-2xl font-bold text-primary-900">
                  Awaiting Alumni Verification
                </h3>
                <p className="text-gray-600">
                  {checkingVerification
                    ? "Confirming your verification status..."
                    : authError ||
                      "Our team is reviewing your registration details. You'll get access once you're verified."}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <button
                    onClick={handleLogout}
                    className="px-5 py-3 rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50 transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() =>
                      session &&
                      session.user?.email &&
                      verifyUser(session.user.email)
                    }
                    disabled={checkingVerification}
                    className="px-5 py-3 rounded-lg bg-primary text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    {checkingVerification ? "Re-checking..." : "Refresh Status"}
                  </button>
                </div>
              </div>
            ) : directoryLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-primary-700">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p>Loading verified alumni...</p>
              </div>
            ) : directoryError ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded-lg text-center space-y-4">
                <p>{directoryError}</p>
                <button
                  onClick={fetchVerifiedAlumni}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <span>Retry Loading</span>
                </button>
              </div>
            ) : (
              <AlumniDirectory alumni={alumni} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
