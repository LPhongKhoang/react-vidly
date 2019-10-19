import React from "react";
import { EditorState, AtomicBlockUtils } from "draft-js";

const addImage = editorState => {
  // open explore folder -> choose image -> up to S3 -> get link
  const urlValue = window.prompt("Paste Image Link");
	const contentState = editorState.getCurrentContent();

	const contentStateWithEntity = contentState.createEntity(
		"image",
		"IMMUTABLE",
		{ src: urlValue }
	);
	const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
	const newEditorState = EditorState.set(
		editorState,
		{ currentContent: contentStateWithEntity },
		"create-entity"
	);
	return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
};

export default addImage;
