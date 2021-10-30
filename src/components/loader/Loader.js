import { CircularProgress } from "@material-ui/core";

const Loader = ({ loading, size, color }) => {
  return <CircularProgress color="#000" hidden={!loading} size={size || 15} />;
};
export default Loader;
