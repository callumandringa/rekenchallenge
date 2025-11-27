"use client";

import { useState } from "react";
import PropTypes from "prop-types";

const LevelSelect = ({ onSelectLevel }) => {
    const [level, setLevel] = useState(null);

    const handleStart = () => {
        if (level) {
            onSelectLevel(level);
        } else {
            alert("Selecteer een niveau om verder te gaan!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 p-4">
            <h2 className="text-4xl mb-8 font-pacifico text-blue-600">
                Selecteer je niveau
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                    className={`level-btn ${
                        level === "1F2F" ? "bg-pink-500" : "bg-pink-400"
                    } hover:bg-pink-500 text-white font-pacifico text-xl px-8 py-4 rounded-full shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50`}
                    onClick={() => setLevel("1F2F")}
                >
                    Entree & Niveau 2
                </button>
                <button
                    className={`level-btn ${
                        level === "3F4F" ? "bg-blue-500" : "bg-blue-400"
                    } hover:bg-blue-500 text-white font-pacifico text-xl px-8 py-4 rounded-full shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`}
                    onClick={() => setLevel("3F4F")}
                >
                    Niveau 3 & 4
                </button>
            </div>
            <button
                className="start-btn bg-green-400 hover:bg-green-500 text-white font-pacifico text-2xl px-12 py-4 rounded-full shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                onClick={handleStart}
            >
                Start spel
            </button>
            <p className="mt-8 text-gray-700 text-center max-w-md">
                Kies het niveau dat het beste bij jou past. 2F is voor
                beginners en gevorderden, 3/4 is voor experts.
            </p>
        </div>
    );
};

LevelSelect.propTypes = {
    onSelectLevel: PropTypes.func.isRequired,
};

export default LevelSelect;
