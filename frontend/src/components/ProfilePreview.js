import React from 'react';
import '../index.css';

const ProfilePreview = ({ user, isLoggedIn, onClose }) => {
    return (
        <div>
            {isLoggedIn ? 
            <div className='profile-preview'>
                <div className='user-info'>
                    <img src={require(`../images/${user.profilePicture}`)} className='profile-picture' />
                    <div>
                        <h2 className='user-name'>{user.name}</h2>
                        <p className='user-email'>{user.email}</p>
                    </div>
                </div>
                <button className='button signout-button'>Sign Out</button>
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
