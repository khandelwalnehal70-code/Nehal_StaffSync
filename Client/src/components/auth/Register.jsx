import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "../../api/api";
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLogin }) => {
      const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      alert("Registration Successful!");
      navigate('/login')
      setIsLogin(true);
    } catch (err) {
      alert(err.res?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="auth-page">
    <header className="auth-header">
      <a className="landing-brand" href="/" aria-label="StaffSync home">
        <span className="brand-mark">S</span><span>StaffSync</span>
      </a>
      <button type="button" className="auth-home-link" onClick={() => navigate("/")}>
        Back to home
      </button>
    </header>

    <div className="auth-layout">
      <section className="auth-story">
        <span className="auth-story-kicker">LET'S MAKE WORK BETTER</span>
        <h1>A good thing<br />starts here.</h1>
        <p>Bring your team into one thoughtful space, and make room for the work that matters.</p>
        <div className="auth-story-art" aria-hidden="true">
          <span className="story-sun" />
          <span className="story-flower">✳</span>
          <span className="story-scribble">good people<br />grow together</span>
        </div>
        <span className="auth-story-caption">GOOD WORK STARTS WITH GOOD PEOPLE.</span>
      </section>

      <div className="auth-form-wrap">
        <Card className="auth-card">
          <CardHeader className="auth-card-header">
            <span className="auth-card-kicker">A FRESH START</span>
            <CardTitle className="auth-card-title">Create your account</CardTitle>
            <p className="auth-card-description">A few details and you’ll be on your way.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="auth-label">Full name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              <div>
                <Label className="auth-label">Email address</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              <div>
                <Label className="auth-label">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              <div>
                <Label className="auth-label">I’m joining as</Label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="auth-input"
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <Button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>

              <p className="auth-switch">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="auth-switch-link"
                >
                  Sign in
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
        <p className="auth-privacy">A calmer workday is just around the corner.</p>
      </div>
    </div>
  </div>
);
};

export default Register;
