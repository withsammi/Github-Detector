import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { PiBuildingsFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

const GithubSearch = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(response.data);
            setError(null);
        } catch (error) {
            setProfile(null);
            setError('User Not Found');
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white flex flex-col items-center gap-8 p-8 font-sans">
            <h1 className="text-4xl md:text-5xl font-semibold text-center text-[#00b4d8] drop-shadow-lg">
                GitHub Profile Finder
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 items-center">
                <input
                    type="text"
                    placeholder="Enter GitHub Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-64 sm:w-96 md:w-1/2 px-4 py-3 rounded-xl text-lg bg-[#0f0f13] text-white placeholder-[#8a8a8a] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
                <button
                    type="submit"
                    className="w-28 sm:w-32 md:w-36 py-3 px-6 rounded-xl bg-[#00b4d8] text-white font-semibold shadow-md hover:bg-[#00a3c7] transition-all"
                >
                    Search
                </button>
            </form>

            {error && <p className="text-red-400 text-lg mt-4">{error}</p>}

            {profile && (
                <div className="bg-[#0f0f13] rounded-xl p-6 w-[90%] max-w-[800px] shadow-2xl mt-8">
                    <div className="flex gap-8">
                        <div className="shrink-0">
                            <img
                                src={profile.avatar_url}
                                alt="Avatar"
                                className="w-24 md:w-32 lg:w-36 rounded-full border-4 border-[#00b4d8] shadow-lg"
                            />
                        </div>

                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#00b4d8]">{profile.name}</h2>
                            <p className="text-sm md:text-base text-gray-400 mt-2">
                                Joined: {new Date(profile.created_at).toLocaleDateString()}
                            </p>

                            <a
                                href={profile.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#00b4d8] mt-4 text-lg hover:underline"
                            >
                                @{profile.login}
                            </a>

                            <p className="mt-4 text-gray-300 leading-relaxed">{profile.bio}</p>

                            <div className="bg-[#1e1e28] mt-6 p-4 rounded-lg flex justify-around text-center shadow-md text-sm">
                                <div>
                                    Repositories
                                    <br />
                                    <span className="text-[#00b4d8] font-semibold text-xl">{profile.public_repos}</span>
                                </div>
                                <div>
                                    Followers
                                    <br />
                                    <span className="text-[#00b4d8] font-semibold text-xl">{profile.followers}</span>
                                </div>
                                <div>
                                    Following
                                    <br />
                                    <span className="text-[#00b4d8] font-semibold text-xl">{profile.following}</span>
                                </div>
                            </div>

                            <div className="flex gap-8 mt-6 justify-center md:justify-start text-sm text-gray-200">
                                {profile.location && (
                                    <p className="flex items-center gap-2">
                                        <FaMapMarkerAlt /> {profile.location}
                                    </p>
                                )}
                                {profile.company && (
                                    <p className="flex items-center gap-2">
                                        <PiBuildingsFill /> {profile.company}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 mt-6">
                                {profile.twitter_username && (
                                    <a
                                        href={`https://twitter.com/${profile.twitter_username}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-[#0f0f13] w-full sm:w-60 py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#1a1a2e] transition-all"
                                    >
                                        <FaXTwitter /> {profile.twitter_username}
                                    </a>
                                )}
                                <a
                                    href={profile.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#0f0f13] w-full sm:w-60 py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#1a1a2e] transition-all"
                                >
                                    <FaGithub /> View Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GithubSearch;
