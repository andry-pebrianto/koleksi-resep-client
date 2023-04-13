import React from "react";
import CreatableSelect from "react-select/creatable";

export default function SelectTag({ tags, setTags }) {
  return (
    <CreatableSelect
      isMulti
      options={tags.map((tag) => ({
        value: tag.name,
        label: tag.name,
      }))}
      onChange={(selectedOptions) =>
        setTags(selectedOptions.map((tag) => tag.value))
      }
    />
  );
}
