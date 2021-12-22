/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const SHOW_PROFILE_PIC = true

export default function Hi() {
  const data = useStaticQuery(graphql`
    query HiQuery {
      avatar: file(absolutePath: { regex: "/profile-pic-crop.jpg/" }) {
        childImageSharp {
          fixed(width: 110, height: 110, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="hi">
      {avatar && SHOW_PROFILE_PIC && (
        <Image
          fixed={avatar}
          alt="Martin Konicek"
          className="avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      <div>
        <p>Hi! I am Martin.</p>
        <p>
          I'm a Software Engineer at <a href="https://www.figma.com/">Figma</a>{" "}
          in London. Previously I worked on{" "}
          <a href="https://reactnative.dev/">React Native</a> at Facebook.
        </p>
      </div>
    </div>
  )
}
