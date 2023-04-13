import React from "react";
import CreatableSelect from "react-select/creatable";

export default function SelectTag({ tagsApi, tags, setTags }) {
  return (
    <CreatableSelect
      isMulti
      options={tagsApi.map((tag) => ({
        value: tag.name,
        label: tag.name,
      }))}
      value={tags.map((tag) => ({
        value: tag,
        label: tag,
      }))}
      onChange={(selectedOptions) =>
        setTags(selectedOptions.map((tag) => tag.value))
      }
    />
  );
}
