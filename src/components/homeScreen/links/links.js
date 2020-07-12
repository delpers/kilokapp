import React from "react"
import Link from 'gatsby-link'

export default function MediaLinks() {
  return (
    <span>
      <Link
        className="float-right i-link font-size-16 b-b-g font-bold"
        to="https://www.facebook.com/kilokafr"
        alt="Facebook"
        target="_blank"
      >
        <i className="fab fa-facebook"></i>
      </Link>

      <Link
        className="float-right i-link font-size-16 b-b-g margin-right-qz font-bold"
        to="https://www.spotify.com/"
        alt="Spotify"
        target="_blank"
      >
        <i className="fab fa-spotify"></i>
      </Link>

      <Link
        className="float-right i-link font-size-16 b-b-g margin-right-qz font-bold"
        to="https://www.instagram.com/kilokafr"
        alt="Spotify"
        target="_blank"
      >
        <i className="fab fa-instagram"></i>
      </Link>
    </span>
  )
}
