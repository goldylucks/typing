// @flow

import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

import { APP_NAME } from '../config'
import { Header } from '../components'

const MainPage = ({ classes }: { classes: Object}) => (
  <div>
    <Helmet
      meta={[
        { name: 'description', content: `${APP_NAME} is an app to practice your typing skills` },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <Header />
    <div className="container">
      <div className={`row ${classes.title}`}>
        <h1 className="text-center" style={{ fontSize: '4em' }}>Practice your typing with ...</h1>
      </div>
      <div className="row">
        <div className="col col-md-6">
          <Link to="/texts" className={`btn btn-default btn-lg btn-block ${classes.actionButton}`}>Existing texts</Link>
        </div>
        <div className="col col-md-6">
          <a href="/add-text" className={`btn btn-primary btn-lg btn-block ${classes.actionButton}`}>Your own text</a>
        </div>
      </div>
      <div className={`row ${classes.footnote}`}>
        <div className="col col-md-12">
          <p>
            <strong>NOTE:</strong>
            This is NOT a tutorial / beginner&apos;s guide for blind typing.
            If u r totally new to blind typing, I recommended
            <a href="//typingclub.com" target="_blank" rel="noopener noreferrer"> this</a> resource (it&apos;s how I got started).
          </p>
        </div>
      </div>
    </div>
  </div>
)

const styles = {
  title: {
    marginTop: '5em',
    marginBottom: '6em',
  },

  actionButton: {
    paddingTop: '70px',
    paddingBottom: '70px',
    fontSize: '50px',
  },

  footnote: {
    marginTop: '3em',
  },
}

export default injectSheet(styles)(MainPage)
