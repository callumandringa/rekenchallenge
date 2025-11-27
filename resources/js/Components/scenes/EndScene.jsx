"use client"

import { useState } from "react"
import PropTypes from "prop-types"

const EndScene = ({ collectedCodes, onEscape }) => {
  const [answer, setAnswer] = useState("")
  const finalCode = collectedCodes.join("")

  const handleSolve = () => {
    // Clean user input
    const userInput = answer.trim()

    if (userInput === finalCode) {
      onEscape && onEscape()
      alert("Gefeliciteerd! Je bent ontsnapt!")
    } else {
      alert("Dat is niet de juiste code. Probeer opnieuw!")
      setAnswer("")
    }
  }

  return (
    <div className="scene flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <h2 className="text-4xl mb-6 font-bold text-purple-600 text-center">Eindpunt</h2>
        <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-6 mb-6">
          <p className="text-xl text-gray-800 font-semibold">
            Gefeliciteerd! Je hebt alle puzzels opgelost. Voer nu de eindcode in om te ontsnappen!
          </p>
          <p className="text-lg text-gray-600 mt-4">
            De eindcode is: 1e cijfer + 2e cijfer + 3e cijfer + 4e cijfer + 5e cijfer
          </p>
        </div>

        <div className="flex space-x-2 justify-center mb-6">
          {collectedCodes.map((code, index) => (
            <span
              key={index}
              className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold text-xl"
            >
              {code}
            </span>
          ))}
        </div>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-4 border-2 border-purple-300 rounded-lg mb-6 text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          placeholder="Voer de eindcode in..."
        />
        <button
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xl py-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50"
          onClick={handleSolve}
        >
          Ontsnap!
        </button>
      </div>
    </div>
  )
}

EndScene.propTypes = {
  collectedCodes: PropTypes.array.isRequired,
  onEscape: PropTypes.func,
}

export default EndScene
