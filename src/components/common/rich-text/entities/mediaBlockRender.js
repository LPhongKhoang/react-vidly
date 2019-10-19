import React from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";

export const mediaBlockRenderer = block => {
  console.log(block.getType())
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }

  return null;
};

const Image = props => {
  if (!!props.src) {
    return <img src={props.src} />;
  }
  return null;
};

const Video = props => {
  if (!!props.src) {
    return (
      <video controls>
        <source src={props.src} type="video/mp4" />
        <source src={props.src} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return null;
};

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media = null;
  if (type === "image") {
    media = <Image src={src} />;
  }

  return media;
};
