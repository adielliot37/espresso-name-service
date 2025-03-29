'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function AnimatedTitle({ text }) {
  const titleRef = useRef(null)

  useEffect(() => {
    const chars = titleRef.current.querySelectorAll('.char')

    chars.forEach((char, i) => {
      char.style.display = 'inline-block'
      char.style.transition = 'transform 0.3s ease, opacity 0.3s ease'
    })

    const onMouseEnter = () => {
      gsap.to(chars, {
        rotateY: 360,
        opacity: 0,
        y: -20,
        stagger: {
          each: 0.03,
          from: 'center'
        },
        duration: 0.5,
        onComplete: () => {
          gsap.to(chars, {
            rotateY: 0,
            opacity: 1,
            y: 0,
            stagger: {
              each: 0.03,
              from: 'edges'
            },
            duration: 0.6
          })
        }
      })
    }

    titleRef.current.addEventListener('mouseenter', onMouseEnter)

    return () => {
      titleRef.current.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return (
    <h1
      ref={titleRef}
      className="text-white text-4xl md:text-6xl font-bold tracking-wide mb-6 drop-shadow-lg cursor-pointer"
    >
      {text.split('').map((char, i) => (
        <span key={i} className="char">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  )
}
