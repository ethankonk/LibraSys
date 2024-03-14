import '../index.css'

export default function Login ({ setEmail, setPassword, setConfirmPassword, handleSignUp, email, password, confirmPassword, toggleAuthMethod }) {
    
    return (
        <div className="login-page">
            <div className="signup-box">
                <h2>Sign Up</h2>
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
                <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className='button primary login2' onClick={()=>handleSignUp()}>Sign Up</button>
                <p>Already have an account?</p>
                <button className='button secondary signup' onClick={()=>toggleAuthMethod()}>Login</button>
            </div>
        </div>
    );
}