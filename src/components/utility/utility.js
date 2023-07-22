import RenderValues from "../renderValue/RenderValues";

export const setToSessionStorage = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
};
export const getFromSessionStorage = (key) => {
  if (sessionStorage.getItem(key)) {
    try {
      const data = JSON.parse(sessionStorage.getItem(key));
      return data;
    } catch (err) {
      return sessionStorage.getItem(key);
    }
  }
  return null;
};

const renderIndicatorText = (indicator) => {
  const { study_type, parameter_name, min_value, max_value, default_value } =
    indicator;
  return (
    <span>
      {`$${parameter_name} (${study_type}): [${min_value} - ${max_value}], Default: ${default_value}`}
    </span>
  );
};

export const renderCriteriaText = (criteriaItem) => {
  const { type, text, variable } = criteriaItem;

  if (type === "variable") {
    let renderedText = text;

    for (const key in variable) {
      if (variable[key].type === "value") {
        const values = variable[key].values;
        const renderedValues = <RenderValues values={values} />;
        const regex = new RegExp(`\\${key}`, "g");
        renderedText = renderedText.replace(regex, renderedValues.props.values);
      } else if (variable[key].type === "indicator") {
        const renderedIndicator = renderIndicatorText(variable[key]);
        const regex = new RegExp(`\\${key}`, "g");
        renderedText = renderedText.replace(
          regex,
          renderedIndicator.props.children
        );
      }
    }

    return (
      <div
        className="criteria-text"
        dangerouslySetInnerHTML={{ __html: renderedText }}
      />
    );
  }

  return text;
};
