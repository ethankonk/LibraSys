import React from 'react'
import { motion } from 'framer-motion'
import '../index.css'
import '../css/profile-preview.css'

const ProfilePreview = ({ user, toggleProfile, setLoggedIn }) => {
    const handleSignout = () => {
        setLoggedIn(false)
        toggleProfile()
    }

    return (
        <div>
            <div className='profile-overlay' onClick={()=>toggleProfile()}></div>
            <div className='profile-container'>
                <motion.div
                initial={{opacity: 0, y: '-17vh'}}
                animate={{opacity: 1, y: '-13vh'}}
                transition={{duration: 0.2, ease: "easeIn"}}
                >
                    <div className='profile-preview'>
                        <div className='user-info'>
                            <img src={require(`../images/${user.profilePicture}`)} className='profile-picture' />
                            <div>
                                <h2 className='user-name'>{user.username}</h2>
                                <p className='user-email'>{user.email}</p>
                            </div>
                        </div>
                        <button className='button secondary signout-button' onClick={handleSignout} >Sign Out</button>
                    </div>
                </motion.div>
            </div>
        </div>
      );
}

export default ProfilePreview;
