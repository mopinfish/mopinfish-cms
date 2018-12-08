import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
 
export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
 
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
            </div>
            <div className="columns is-desktop is-multiline">
              {posts
                .map(({ node: post }) => (
                  <div className="column is-one-third" key={post.id}>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      <div className="card">
                        <div className="card-image">
                          <figure className="image">
                            <img src={'/img/' + post.frontmatter.image.relativePath} alt={post.frontmatter.image.relativePath}/>
                          </figure>
                        </div>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p className="title is-4">
                                  {post.frontmatter.title}
                              </p>
                              <p className="subtitle is-6">Author: {post.frontmatter.author}</p>
                            </div>
                          </div>
 
                          <div className="content">
                            {post.excerpt}
                            <br/>
                            <Link className="button is-small" to={post.fields.slug}>
                              Keep Reading
                            </Link>
                            <br/>
                            <time>{post.frontmatter.date}</time>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
 
                ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
 
IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};
 
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            author
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image {
              relativePath
            }
          }
        }
      }
    }
  }
`;
