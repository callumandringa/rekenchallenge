"use client"

import { useState } from "react"
import PropTypes from "prop-types"

const HomeScene = ({ onSolve, vragen, solvedObjects }) => {
  const [showModal, setShowModal] = useState(false)
  const [currentVraag, setCurrentVraag] = useState(null)
  const [answer, setAnswer] = useState("")
  const [currentObjectIndex, setCurrentObjectIndex] = useState(null)
  const [zoomImage, setZoomImage] = useState(false)

  // Improved answer validation to be more flexible
  const handleSolve = () => {
    if (!currentVraag) return

    // Clean user input: remove currency symbols, replace comma with dot
    const userInput = answer.trim().replace(/[€$]/g, "").replace(",", ".").trim()

    // Clean expected answer
    const expectedAnswer = String(currentVraag.antwoord).replace(/[€$]/g, "").replace(",", ".").trim()

    // Check if the answer is close enough (within 0.01)
    const userNumber = Number.parseFloat(userInput)
    const expectedNumber = Number.parseFloat(expectedAnswer)

    if (!isNaN(userNumber) && !isNaN(expectedNumber) && Math.abs(userNumber - expectedNumber) <= 0.01) {
      setShowModal(false)
      onSolve(currentObjectIndex)
      setAnswer("")
    } else {
      alert("Fout! Probeer opnieuw.")
    }
  }

  const openModal = (vraag, index) => {
    if (!solvedObjects[index]) {
      setCurrentVraag(vraag)
      setCurrentObjectIndex(index)
      setShowModal(true)
    }
  }

  const toggleZoom = () => {
    setZoomImage(!zoomImage)
  }

  // Helper function to add time notation hint if needed
  const addTimeNotationHint = (vraag) => {
    if (vraag && (vraag.vraag.toLowerCase().includes("tijd") || vraag.vraag.toLowerCase().includes("uur"))) {
      return (
        <p className="text-sm text-blue-600 italic mb-2">
          Noteer tijden met een dubbele punt (bijv. 8:30) en noteer geldbedragen met een komma & twee decimalen(bijv.
          16,30)
        </p>
      )
    }
    return null
  }

  return (
    <div
      className="scene relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/KamerScene.jpg')" }}
    >
      <h2 className="text-4xl text-center text-white p-6 font-bold drop-shadow-lg">Je Kamer</h2>

      {/* Improved object buttons */}
      <button
        className={`absolute left-20 top-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          solvedObjects[0] ? "opacity-50 cursor-not-allowed bg-blue-400" : ""
        }`}
        onClick={() => openModal(vragen[0], 0)}
        disabled={solvedObjects[0]}
      >
        📖 Boek
      </button>
      <button
        className={`absolute right-40 bottom-20 bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 ${
          solvedObjects[1] ? "opacity-50 cursor-not-allowed bg-green-400" : ""
        }`}
        onClick={() => openModal(vragen[1], 1)}
        disabled={solvedObjects[1]}
      >
        📒 Schrift
      </button>

      {/* Modal with improved UI and zoom functionality - smaller and scrollable */}
      {showModal && currentVraag && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full mx-auto my-4 relative max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
              >
                <span className="text-2xl">×</span>
              </button>

              <h3 className="text-xl mb-3 font-bold text-gray-800">Los deze som op!</h3>

              <div className="relative">
                {zoomImage ? (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                    onClick={toggleZoom}
                  >
                    <img
                      src={currentVraag.image_url || "/placeholder.svg"}
                      alt="Uitvergrote afbeelding"
                      className="max-w-full max-h-[90vh] p-4"
                    />
                    <button className="absolute top-4 right-4 bg-white rounded-full p-1" onClick={toggleZoom}>
                      <span className="text-2xl">×</span>
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={currentVraag.image_url || "/placeholder.svg"}
                      alt="Som afbeelding"
                      className="w-full mb-3 rounded max-h-[30vh] object-contain"
                    />
                    <button
                      className="absolute bottom-5 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      onClick={toggleZoom}
                    >
                      <span className="text-lg">🔍</span>
                    </button>
                  </div>
                )}
              </div>

              <p className="text-base mb-3 text-gray-700">{currentVraag.vraag}</p>

              {addTimeNotationHint(currentVraag)}

              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Jouw antwoord..."
              />

              <div className="flex justify-end space-x-3">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Sluit
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors"
                  onClick={handleSolve}
                >
                  Controleer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

HomeScene.propTypes = {
  onSolve: PropTypes.func.isRequired,
  vragen: PropTypes.arrayOf(PropTypes.object).isRequired,
  solvedObjects: PropTypes.arrayOf(PropTypes.bool).isRequired,
}

export default HomeScene
