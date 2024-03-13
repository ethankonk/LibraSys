import React from 'react';
import '../index.css';

const ProfilePreview = ({ user, isLoggedIn, onClose }) => {
    return (
        <div>
            {isLoggedIn ? 
            <div className='profile-preview'>
                <img src={user.profilepicture} className='profile-picture' />
                <div className='user-info'>
                    <h2 className='user-name'>{user.name}</h2>
                    <p className='user-email'>{user.email}</p>
                </div> 
            </div>
            : 
            <div>
                <h2>Not logged in? Login!</h2>
                <button>Login</button>
                <p>or</p>
                <button>Sign Up</button>
            </div>}
        </div>
      );
}

export default ProfilePreview;
