import React from "react";
import TagEditor from "../components/tagEditor";
import "../styles/tageditor.css";
import BackButton from "../components/backButton";

const TagEditorPage = () => {
	return (
		<div className="tool-tip-page">
			<TagEditor />
			<BackButton />
		</div>
	);
};

export default TagEditorPage;
