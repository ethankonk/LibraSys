import '../index.css'

export default function Login ({ setEmail, setPassword, handleLogin, email, password, toggleAuthMethod }) {
    
    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Login</h2>
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className='button secondary login2' onClick={()=>handleLogin()}>Login</button>
                <p>or</p>
                <button className='button primary signup' onClick={()=>toggleAuthMethod()}>Sign Up</button>
            </div>
        </div>
    );
}