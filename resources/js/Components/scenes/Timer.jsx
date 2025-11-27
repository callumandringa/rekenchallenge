"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const Timer = ({ running, complete, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)

  useEffect(() => {
    let interval = null

    if (running) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1
          if (newSeconds === 60) {
            setMinutes((prevMinutes) => {
              const newMinutes = prevMinutes + 1
              if (newMinutes === 60) {
                setHours((prevHours) => prevHours + 1)
                return 0
              }
              return newMinutes
            })
            return 0
          }
          return newSeconds
        })
      }, 1000)
    } else if (!running && seconds !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [running, seconds])

  useEffect(() => {
    if (onTimeUpdate) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds
      onTimeUpdate(totalSeconds)
    }
  }, [hours, minutes, seconds, onTimeUpdate])

  const formatTime = (value) => {
    return value.toString().padStart(2, "0")
  }

  return (
    <div className={`px-4 py-2 rounded-lg font-mono text-xl font-bold ${complete ? "bg-green-500" : "bg-blue-700"}`}>
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
    </div>
  )
}

Timer.propTypes = {
  running: PropTypes.bool.isRequired,
  complete: PropTypes.bool,
  onTimeUpdate: PropTypes.func,
}

export default Timer
