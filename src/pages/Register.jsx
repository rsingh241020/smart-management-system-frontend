import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please check your details and try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-cyan-950/30 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="hidden bg-slate-900 px-10 py-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
                <UserPlus size={24} />
              </div>
              <h1 className="max-w-md text-4xl font-bold leading-tight text-white">
                Create your Smart Manager account.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                Register with your name, email, and password.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300">
              Built with secure role-based authentication to provide seamless
              access control, enhanced security, and a personalized user
              experience.
            </div>
          </section>
          <section className="bg-slate-50 px-6 py-10 text-slate-950 sm:px-10 lg:px-12 lg:py-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-9">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                  Get started
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Register account
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Enter your details to create a new account.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Admin users will be taken to the admin panel after login by
                  default.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleRegister}>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition duration-200 placeholder:text-slate-400 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition duration-200 placeholder:text-slate-400 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition duration-200 placeholder:text-slate-400 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Register
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  className="font-semibold text-cyan-700 transition hover:text-cyan-600"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Register;
