import React, { useEffect } from 'react';

const VanillaPage: React.FC = () => {
  useEffect(() => {
    window.location.href = '/vanilla.html';
  }, []);

  return null;
};

export default VanillaPage;
