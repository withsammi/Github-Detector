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
        <div className="min-h-screen w-full bg-[#141d2f] text-white flex flex-col items-center gap-12 p-4 font-[Space_Mono]">
            <h1 className="text-3xl md:text-4xl font-bold mt-12 text-center">GitHub Profile Detective</h1>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="Enter Github Username...."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-64 sm:w-[400px] md:w-[600px] px-5 py-4 rounded-full text-lg bg-[#2b3d65] text-white placeholder-white shadow-md outline-none border-none"
                />
                <button
                    type="submit"
                    className="w-24 sm:w-28 md:w-32 py-4 rounded-full bg-[#20428a] text-white font-bold text-lg shadow-md hover:bg-[#1a3a75] transition-all"
                >
                    Search
                </button>
            </form>

            {error && <p className="text-red-500 text-lg">{error}</p>}

            {profile && (
                <div className="bg-[#1e2a47] rounded-2xl p-6 w-[90%] max-w-[720px] shadow-md text-sm md:text-base">
                    <div className="flex gap-6">
                        <div className="shrink-0">
                            <img
                                src={profile.avatar_url}
                                alt="Avatar"
                                className="w-20 md:w-24 lg:w-28 rounded-full border-4 border-[#20428a] shadow-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center w-full">
                                <h2 className="text-xl md:text-2xl font-bold">{profile.name}</h2>
                                <p className="text-sm md:text-base text-gray-300">
                                    Joined: {new Date(profile.created_at).toLocaleDateString()}
                                </p>
                            </div>

                            <a
                                href={profile.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white mt-2 hover:underline text-sm md:text-base"
                            >
                                @{profile.login}
                            </a>

                            <p className="mt-4 text-gray-400 leading-relaxed">{profile.bio}</p>

                            <div className="bg-[#141d2f] mt-4 p-4 rounded-lg flex justify-around text-center shadow-md">
                                <div>
                                    Repositories
                                    <br />
                                    <span className="text-[#1b47a4] font-extrabold text-xl">{profile.public_repos}</span>
                                </div>
                                <div>
                                    Followers
                                    <br />
                                    <span className="text-[#1b47a4] font-extrabold text-xl">{profile.followers}</span>
                                </div>
                                <div>
                                    Following
                                    <br />
                                    <span className="text-[#1b47a4] font-extrabold text-xl">{profile.following}</span>
                                </div>
                            </div>

                            <div className="flex gap-10 mt-6 flex-wrap text-sm text-gray-200">
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

                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                {profile.twitter_username && (
                                    <a
                                        href={`https://twitter.com/${profile.twitter_username}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-[#141d2f] w-full sm:w-60 py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#1a253f] transition-all"
                                    >
                                        <FaXTwitter /> {profile.twitter_username}
                                    </a>
                                )}
                                <a
                                    href={profile.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#141d2f] w-full sm:w-60 py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#1a253f] transition-all"
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
