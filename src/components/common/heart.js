import React from 'react';

const Heart = ({love, toggleLove}) => {
  let classes = "fa fa-heart";
  if(!love) classes += "-o";
  return (
    (<i onClick={toggleLove} className={classes} aria-hidden="true"></i>)
  );
}

export default Heart;