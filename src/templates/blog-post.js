import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  image
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
          <img src={'/img/' + image.relativePath} alt={image.relativePath}/>
          <PostContent content={content} />
          {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }}>
              <h4>Tags</h4>
              <ul className="taglist">
                {tags.map(tag => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </section>
)
}

BlogPostTemplate.propTypes = {
content: PropTypes.node.isRequired,
contentComponent: PropTypes.func,
description: PropTypes.string,
title: PropTypes.string,
helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
const { markdownRemark: post } = data

return (
  <Layout>
    <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Meta post={post}>
          </Meta>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

const host = 'https://mopinfish.netlify.com'
const Meta = ({ post }) => {
  return (
    <Helmet
      title={`${post.frontmatter.title} | Blog`}
      meta={[
        { name: 'description', content: post.frontmatter.description },
        { property: 'og:title', content: post.frontmatter.title },
        { property: 'og:description', content: post.frontmatter.description },
        { property: 'og:image', content: host + '/img/' + post.frontmatter.image.relativePath },
        { property: 'og:url', content: host + post.fields.slug }
      ]}
    />
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image {
          relativePath
        }
      }
    }
  }
`
