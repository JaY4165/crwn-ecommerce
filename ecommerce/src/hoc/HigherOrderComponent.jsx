/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
const withEnhancement = (wrappedComponent) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <wrappedComponent {...props} />;
  };
};

const dataComponent = ({ data }) => {
  return <div> {data}</div>;
};

const EnhancedComponent = withEnhancement(dataComponent);

export default EnhancedComponent;
