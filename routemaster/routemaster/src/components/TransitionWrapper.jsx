// src/components/TransitionWrapper.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const TransitionWrapper = ({ children }) => {
  const controls = useAnimation();
  const location = useLocation();

  useEffect(() => {
    controls.start({ opacity: 0 }).then(() => {
      controls.start({ opacity: 1 });
    });
  }, [location.pathname, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

TransitionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TransitionWrapper;
