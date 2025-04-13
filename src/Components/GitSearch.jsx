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
        <div className="min-h-screen w-full bg-gradient-to-b from-[#ff5c8d] to-[#4b0082] text-white flex flex-col items-center gap-10 p-8 font-['Poppins']">
            <h1 className="text-5xl md:text-6xl font-bold text-center text-[#f2e2f2] drop-shadow-md">
                GitHub Profile Searcher
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 items-center">
                <input
                    type="text"
                    placeholder="Enter GitHub Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-64 sm:w-96 md:w-[500px] px-6 py-4 rounded-xl text-lg bg-[#3b0a45] text-white placeholder-[#f0e6f3] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#ff8bc2]"
                />
                <button
                    type="submit"
                    className="w-28 sm:w-32 md:w-40 py-4 px-8 rounded-xl bg-[#ff8bc2] text-white font-semibold shadow-md hover:bg-[#ff66b3] transition-all"
                >
                    Search
                </button>
            </form>

            {error && <p className="text-red-300 text-lg mt-4">{error}</p>}

            {profile && (
                <div className="bg-[#3b0a45] rounded-xl p-6 w-full max-w-[800px] shadow-2xl mt-8">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                        <div className="flex justify-center md:block">
                            <img
                                src={profile.avatar_url}
                                alt="Avatar"
                                className="w-24 md:w-32 lg:w-36 rounded-full border-4 border-[#ff8bc2] shadow-xl"
                            />
                        </div>

                        <div className="flex-1 flex flex-col text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#ff8bc2]">{profile.name}</h2>
                            <p className="text-sm md:text-base text-gray-300 mt-2">
                                Joined: {new Date(profile.created_at).toLocaleDateString()}
                            </p>

                            <a
                                href={profile.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#ff8bc2] mt-4 text-lg hover:underline"
                            >
                                @{profile.login}
                            </a>

                            {/* Bio spacing fix */}
                            {profile.bio ? (
                                <p className="mt-4 text-gray-200 leading-relaxed">{profile.bio}</p>
                            ) : (
                                <div className="mt-4 h-6"></div>
                            )}

                            <div className="bg-[#2a0845] mt-6 p-4 rounded-lg flex justify-evenly text-center shadow-md text-sm flex-wrap gap-y-4">
                                <div>
                                    Repositories
                                    <br />
                                    <span className="text-[#ff8bc2] font-semibold text-xl">{profile.public_repos}</span>
                                </div>
                                <div>
                                    Followers
                                    <br />
                                    <span className="text-[#ff8bc2] font-semibold text-xl">{profile.followers}</span>
                                </div>
                                <div>
                                    Following
                                    <br />
                                    <span className="text-[#ff8bc2] font-semibold text-xl">{profile.following}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start text-sm text-gray-200">
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
                                        className="bg-[#3b0a45] w-full sm:w-60 py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#4b0b5b] transition-all"
                                    >
                                        <FaXTwitter /> {profile.twitter_username}
                                    </a>
                                )}
                                <a
                                    href={profile.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#3b0a45] w-full sm:w-60 py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#4b0b5b] transition-all"
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
