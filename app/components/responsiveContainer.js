import React from 'react';
import MediaQuery from 'react-responsive';
import Paper from 'material-ui/Paper';

const ResponsiveContainer = ({ paperStyle, children }) => (
  <div
  >
    <MediaQuery maxWidth={1224}>
      {children}
    </MediaQuery>
    <MediaQuery minWidth={1225}>
      <Paper
        zDepth={0}
        style={{
          width: 1020,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "1em",
          ...paperStyle
        }}
      >
        {children}
      </Paper>
    </MediaQuery>
  </div>
)

export default ResponsiveContainer;
