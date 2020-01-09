import React from "react";
import { graphql } from "gatsby";
const PageTemplate = props => (
  <div
    style={{
      margin: "auto",
      paddingTop: 200,
      marginTop: 200,
      position: "relative",
      width: 500,
      height: 2000,
      background: "#e0e0e0"
    }}
    dangerouslySetInnerHTML={{ __html: props.data.post.html }}
  />
);

export default PageTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
    }
  }
`;
