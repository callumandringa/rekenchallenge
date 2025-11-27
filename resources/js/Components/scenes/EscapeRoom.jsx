"use client"

import { useState, useEffect } from "react"
import LevelSelect from "./LevelSelect"
import HomeScene from "@/Components/scenes/HomeScene"
import TrainStationScene from "@/Components/scenes/TrainStationScene"
import VVVOfficeScene from "@/Components/scenes/VVVOfficeScene"
import CitySquareScene from "@/Components/scenes/CitySquareScene"
import BeachScene from "@/Components/scenes/BeachScene"
import EndScene from "@/Components/scenes/EndScene"
import Timer from "./Timer"

export const EscapeRoom = () => {
  const [currentScene, setCurrentScene] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [devMode, setDevMode] = useState(false)
  const [vragen, setVragen] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [collectedCodes, setCollectedCodes] = useState([])
  const [solvedObjects, setSolvedObjects] = useState([false, false])
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerComplete, setTimerComplete] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Fixed codes for each scene instead of random
  const sceneCodes = {
    "1F2F": [3, 7, 1, 9, 5],
    "3F4F": [6, 2, 8, 4, 9],
  }

  useEffect(() => {
    if (selectedLevel) {
      fetchVragen(selectedLevel)
      // Start the timer when level is selected
      setTimerRunning(true)
      setElapsedTime(0)
    }
  }, [selectedLevel])

  const fetchVragen = async (level) => {
    setIsLoading(true)
    try {
      const response = await fetch("https://rekenchallenge.joostvdlaan.com/api/reken-vragen")
      const data = await response.json()
      console.log("🔵 API Data:", data)

      let niveauVragen = data.filter((vraag) => (level === "1F2F" ? vraag.niveau <= 2 : vraag.niveau >= 3))

      console.log(`🟢 Beschikbare vragen voor ${level}:`, niveauVragen.length, niveauVragen)

      if (niveauVragen.length < 10) {
        console.warn(`❌ Niet genoeg vragen!`)
        niveauVragen = fixVragen(niveauVragen)
      }

      setVragen(niveauVragen.slice(0, 10))
    } catch (error) {
      console.error("API Fout:", error)
    }
    setIsLoading(false)
  }

  const fixVragen = (vragen) => {
    const gefixteVragen = [...vragen]
    const targetLength = 10

    while (gefixteVragen.length < targetLength) {
      const extraVraag = vragen[Math.floor(Math.random() * vragen.length)]
      if (extraVraag) {
        gefixteVragen.push({ ...extraVraag, id: Math.random() })
      }
    }

    return gefixteVragen.sort(() => Math.random() - 0.5).slice(0, targetLength)
  }

  const handleSolve = (objectIndex) => {
    const newSolvedObjects = [...solvedObjects]
    newSolvedObjects[objectIndex] = true
    setSolvedObjects(newSolvedObjects)

    if (newSolvedObjects.every((solved) => solved)) {
      // Use fixed code instead of random
      const code = selectedLevel ? sceneCodes[selectedLevel][currentScene] : 1
      setCollectedCodes((prevCodes) => [...prevCodes, code])
      alert(`✅ Scene ${currentScene + 1} compleet! Code: ${code}`)
      setSolvedObjects([false, false])
      setCurrentScene((prev) => prev + 1)
    }
  }

  const handleEscape = () => {
    // Stop the timer when user successfully escapes
    setTimerRunning(false)
    setTimerComplete(true)
  }

  const renderScene = () => {
    if (isLoading) return <div className="text-center text-xl mt-10">Vragen laden...</div>
    if (vragen.length === 0) return <div className="text-center text-xl mt-10">Geen vragen beschikbaar...</div>

    const sceneProps = {
      onSolve: handleSolve,
      vragen: vragen.slice(currentScene * 2, currentScene * 2 + 2),
      solvedObjects: solvedObjects,
    }

    switch (currentScene) {
      case 0:
        return <HomeScene {...sceneProps} />
      case 1:
        return <TrainStationScene {...sceneProps} />
      case 2:
        return <VVVOfficeScene {...sceneProps} />
      case 3:
        return <CitySquareScene {...sceneProps} />
      case 4:
        return <BeachScene {...sceneProps} />
      case 5:
        return <EndScene collectedCodes={collectedCodes} onEscape={handleEscape} />
      default:
        return <div>Onbekende scène</div>
    }
  }

  return (
    <div className="w-full h-screen flex flex-col bg-yellow-200">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reken Challenge Escape Room</h1>

        <div className="flex items-center space-x-4">
          {selectedLevel && <Timer running={timerRunning} complete={timerComplete} onTimeUpdate={setElapsedTime} />}

          {/* <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={devMode}
              onChange={() => setDevMode(!devMode)}
              className="cursor-pointer w-4 h-4"
            />
            <span>Dev Mode</span>
          </label> */}
        </div>
      </div>

      <div className="flex-grow relative">
        {!selectedLevel ? (
          <LevelSelect onSelectLevel={setSelectedLevel} />
        ) : (
          <>
            {renderScene()}

            <div className="fixed top-20 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-2">Verzamelde cijfers:</h3>
              <div className="flex space-x-2">
                {collectedCodes.map((code, index) => (
                  <span
                    key={index}
                    className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold"
                  >
                    {code}
                  </span>
                ))}
                {[...Array(5 - collectedCodes.length)].map((_, index) => (
                  <span key={index} className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full">
                    ?
                  </span>
                ))}
              </div>
            </div>
{/* 
            {devMode && (
              <div className="fixed bottom-4 left-4 flex space-x-4">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setCurrentScene((prev) => Math.max(0, prev - 1))}
                  disabled={currentScene === 0}
                >
                  Vorige scène
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setCurrentScene((prev) => Math.min(5, prev + 1))}
                  disabled={currentScene === 5}
                >
                  Volgende scène
                </button>
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  )
}
export default EscapeRoom