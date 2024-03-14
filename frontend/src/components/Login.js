import '../index.css'

export default function Login ({ setUsername, setPassword, handleLogin, username, password }) {
    
    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Login</h2>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className='button secondary login2' onClick={()=>handleLogin()}>Login</button>
            </div>
        </div>
    );
}