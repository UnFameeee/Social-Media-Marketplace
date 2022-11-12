import React from 'react';

function SideBarButton({ label, onClick, ...others }) {
  return (
    <button
      {...others}
      className="bg-gray-200 rounded-lg py-[0.5rem] mt-[1.2rem] font-semibold hover:bg-[#dadada]"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default SideBarButton;
