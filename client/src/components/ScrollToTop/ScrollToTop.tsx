import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the window
  }, [pathname]); // Re-run effect whenever pathname changes (route changes)

  return null; // This component doesn't render any UI
}
export default ScrollToTop;
