import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import api from "../../api/api";
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("Login Successful!");

            setTimeout(() => {
                const role = res.data.user?.role;
                if (role === 'Employee') navigate('/employee');
                else if (role === 'HR') navigate('/hr');
                else if (role === 'Manager') navigate('/manager');
                else navigate('/');
            }, 1200);
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
            console.log(error);
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
                    <span className="auth-story-kicker">A WARM WELCOME BACK</span>
                    <h1>Your people<br />are right here.</h1>
                    <p>Pick up where you left off and make today a good one.</p>
                    <div className="auth-story-art" aria-hidden="true">
                        <span className="story-sun" />
                        <span className="story-flower">✳</span>
                        <span className="story-scribble">one thing<br />at a time</span>
                    </div>
                    <span className="auth-story-caption">GOOD WORK STARTS WITH GOOD PEOPLE.</span>
                </section>

                <div className="auth-form-wrap">
                    <Card className="auth-card">
                        <CardHeader className="auth-card-header">
                            <span className="auth-card-kicker">YOUR WORKSPACE AWAITS</span>
                            <CardTitle className="auth-card-title">Welcome back</CardTitle>
                            <p className="auth-card-description">Sign in to continue to your StaffSync account.</p>
                        </CardHeader>
                        <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="auth-input"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="auth-submit"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                            <p className="auth-switch">
                                New to StaffSync?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="auth-switch-link"
                                >
                                    Create an account
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
}

export default Login
